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

  async Get(callID: string): Promise<EventModel[]> {
    const url = `${environment.searchProvider.url}/api/v2/trace/${callID}`;
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

    result.action = zapkinSpan.name;
    result.callId = zapkinSpan.traceId;
    result.durationMs = zapkinSpan.duration && zapkinSpan.duration / 1000;
    result.parentSpanId = zapkinSpan.parentId;
    result.spanId = zapkinSpan.id;
    result.startedAt = zapkinSpan.timestamp && new Date(zapkinSpan.timestamp);
    result.from.name = zapkinSpan.localEndpoint && (zapkinSpan.localEndpoint.serviceName || zapkinSpan.localEndpoint['ipv4']);
    result.to.name = zapkinSpan.remoteEndpoint && (zapkinSpan.remoteEndpoint.serviceName
      || zapkinSpan.remoteEndpoint['ipv4']);
    // add ip4 extra
    switch (zapkinSpan.kind) {
      case 'CLIENT': result.direction = 0; break;
      case 'SERVER': result.direction = 1; break;
      case 'PRODUCER': result.direction = 2; break;
      case 'CONSUMER': result.direction = 3; break;
      // LOG
      case undefined:
        if (!result.parentSpanId) {
          result.parentSpanId = result.spanId;
        }

        if (!result.to.name) {
          result.direction = Direction.RequestOneWay;
          result.to.name = result.from.name;
          result['isLog'] = true;

        } else {
          result.direction = Direction.RequestTwoWay;
        }
        break;
    }
    return result;
  }
  uniq(): string {
    // tslint:disable-next-line: no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
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

