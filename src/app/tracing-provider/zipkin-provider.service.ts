import { environment } from 'src/environments/environment';
import { EventModel, Direction } from '../model/event-model';
import { Injectable } from '@angular/core';
import { TracingProvider } from './tracingProvider';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
interface Dictionary<T> {
  [Key: string]: T;
}

@Injectable({
  providedIn: 'root'
})

export class ZipkinProviderService implements TracingProvider {
  GetName(): string {
    return 'zipkin';
  }

  constructor(private httpClient: HttpClient) { }

  async Get(traceId: string): Promise<EventModel[]> {
    const url = `${environment.tracingProvider.url}/api/v2/trace/${traceId}`;
    try {
      const zipkinResponse = await this.httpClient.get<Zipkin[]>(url).toPromise();
      const results = zipkinResponse.map(x => this.Convert(x));


      return results;
    } catch (error) {
      const ex = error as HttpErrorResponse;
      if (ex.status === 404) {
        return null;
      }
      throw error;
    }

  }
  Convert(zipkinSpan: Zipkin): EventModel {

    const result: EventModel = new EventModel();
    Object.keys(zipkinSpan).forEach(property => {
      result[property] = zipkinSpan[property];
    });

    result.tracer.action = zipkinSpan.name;
    result.tracer.traceId = zipkinSpan.traceId;
    result.tracer.durationMs = zipkinSpan.duration && zipkinSpan.duration / 1000;
    result.tracer.parentSpanId = zipkinSpan.parentId;
    result.tracer.spanId = zipkinSpan.id;
    result.tracer.error = zipkinSpan['tags'] && zipkinSpan['tags']['error'];
    result.tracer.timestamp = zipkinSpan.timestamp && zipkinSpan.timestamp;
    result.tracer.from.name = zipkinSpan.localEndpoint && (zipkinSpan.localEndpoint.serviceName || zipkinSpan.localEndpoint['ipv4']);
    result.tracer.to.name = zipkinSpan.remoteEndpoint && (zipkinSpan.remoteEndpoint.serviceName
      || zipkinSpan.remoteEndpoint['ipv4']);
    // add ip4 extra
    switch (zipkinSpan.kind) {
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
          result.tracer.direction = Direction.ActionStart;
          result.tracer.to.name = result.tracer.from.name;
          result['isLog'] = true;

        } else {
          result.tracer.direction = Direction.LogicalTransactionStart;
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

