import { Injectable } from '@angular/core';
import { Search } from './search';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const url = `${environment.zipkinUrl}/api/v2/trace/${callID}`;
    try {
      const zapkinResponse = await this.httpClient.get<Zipkin[]>(url).toPromise();
      const results = zapkinResponse.map(x => this.Convert(x));
      const fromName: Dictionary<string> = {};


      addMissingDestintionName(results, fromName);

      return results;
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
    // add ip4 extra
    switch (zapkinSpan.kind) {
      case 'CLIENT': result.direction = 0; break;
      case 'SERVER': result.direction = 1; break;
      case 'PRODUCER': result.direction = 2; break;
      case 'CONSUMER': result.direction = 3; break;
      // LOG/ metrics -> how to resolve the localEndPoint?
      case undefined:
        result.direction = Direction.RequestOneWay;
        result.parentSpanId = result.spanId;
        result.spanId = this.uniq();
        result['isLog'] = true;
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
function addMissingDestintionName(results: EventModel[], fromName: Dictionary<string>) {
  //event["parentId"] we change the event in case of log
  results.forEach(event => {
    if (event.from && event.from.name && event["parentId"]) {
      fromName[event["parentId"]] = event.from.name;
    }
  });
  results.forEach(event => {
    if (!event.from.name && event["parentId"]) {
      event.from.name = fromName[event["parentId"]];

    }
    if (event['isLog'] &&event["parentId"]) {
      event.to.name = fromName[event["parentId"]];
    }

  });
}

