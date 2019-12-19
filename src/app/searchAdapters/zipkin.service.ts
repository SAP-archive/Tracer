import { Injectable } from '@angular/core';
import { inherits } from 'util';
import { Search } from './search';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { EventModel } from '../model/event-model';
import { Result } from '../sequence-diagram/sequence-diagram.component';

@Injectable({
  providedIn: 'root'
})
export class ZipkinService implements Search {
  constructor(private httpClient: HttpClient) { }

  async Get(callID: string): Promise<EventModel[]> {
    const url = `${environment.zipkinUrl}/api/v2/trace/${callID}`;
    try {
      const zapkinResponse = await this.httpClient.get<Zipkin[]>(url).toPromise();
      return zapkinResponse.map(x => this.Convert(x));
    } catch (error) {
      //if 404 return
      //return [];
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
    result.startedAt = new Date(zapkinSpan.timestamp);
    result.from.name = zapkinSpan.localEndpoint && zapkinSpan.localEndpoint.serviceName;
    result.to.name = zapkinSpan.remoteEndpoint && zapkinSpan.remoteEndpoint.serviceName;
    // add ip4 ecrta
    switch (zapkinSpan.kind) {
      case 'CLIENT': result.direction = 0; break;
      case 'SERVER': result.direction = 1; break;
      case 'PRODUCER': result.direction = 0; break;
      case 'CONSUMER': result.direction = 1; break;

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
  tags: {};
  annotations: Annotation;
  shared: boolean;
  debug: boolean;
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
