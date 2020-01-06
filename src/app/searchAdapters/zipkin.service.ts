import { Injectable } from '@angular/core';
import { Search } from './search';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { EventModel, Direction } from '../model/event-model';
interface Dictionary<T> {
  [Key: string]: T;
}

@Injectable({
  providedIn: 'root'
})
export class ZipkinService implements Search {
  constructor(private httpClient: HttpClient) { }

  async Get(traceId: string): Promise<EventModel[]> {
    const url = `${environment.tracingProvider.url}/api/v2/trace/${traceId}`;
    try {
      const zapkinResponse = await this.httpClient.get<Zipkin[]>(url).toPromise();
      const results = zapkinResponse.map(x => this.Convert(x));


      return results;
    } catch (error) {
      const ex = error as HttpErrorResponse;
      if (ex.status === 404) {
        return null;
      }
      throw error;
    }

  }
  Convert(zapkinSpan: Zipkin): EventModel {

    const result: EventModel = new EventModel();
    Object.keys(zapkinSpan).forEach(property => {
      result[property] = zapkinSpan[property];
    });

    result.tracer.action = zapkinSpan.name;
    result.tracer.traceId = zapkinSpan.traceId;
    result.tracer.durationMs = zapkinSpan.duration && zapkinSpan.duration / 1000;
    result.tracer.parentSpanId = zapkinSpan.parentId;
    result.tracer.spanId = zapkinSpan.id;
    result.tracer.timestamp = zapkinSpan.timestamp && zapkinSpan.timestamp;
    result.tracer.from.name = zapkinSpan.localEndpoint && (zapkinSpan.localEndpoint.serviceName || zapkinSpan.localEndpoint['ipv4']);
    result.tracer.to.name = zapkinSpan.remoteEndpoint && (zapkinSpan.remoteEndpoint.serviceName
      || zapkinSpan.remoteEndpoint['ipv4']);
    // add ip4 extra
    switch (zapkinSpan.kind) {
      case 'CLIENT': result.tracer.direction = 0; break;
      case 'SERVER': result.tracer.direction = 1; break;
      case 'PRODUCER': result.tracer.direction = 2; break;
      case 'CONSUMER': result.tracer.direction = 3; break;
      // LOG
      case undefined:
        if (!result.tracer.parentSpanId) {
          result.tracer.parentSpanId = result.tracer.spanId;
        }

        if (!result.tracer.to.name) {
          result.tracer.direction = Direction.RequestOneWay;
          result.tracer.to.name = result.tracer.from.name;
          result['isLog'] = true;

        } else {
          result.tracer.direction = Direction.RequestTwoWay;
        }
        break;
    }
    return result;
  }

}



// read more about the zapkin api https://zipkin.io/zipkin-api/#/default/get_trace__traceId_
export interface Zipkin {
  id: string;
  traceId: string;
  parentId: string;
  name: string;
  timestamp: number;
  duration: number;
  kind: string; //  [ CLIENT, SERVER, PRODUCER, CONSUMER ]
  localEndpoint: Endpoint;
  remoteEndpoint: Endpoint;
  annotations: Annotation;
  shared: boolean;
}

export interface Annotation {
  timestamp: number;
  value: string;
}

export interface Endpoint {
  serviceName: string;
  ipv4: string;
  ipv6: string;
  port: number;
}

