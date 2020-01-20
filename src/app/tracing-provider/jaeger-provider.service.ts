import { TracingProvider } from './tracingProvider';
import { EventModel } from '../model/event-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class JaegerProviderService implements TracingProvider {

  GetName(): string {
    return  'jaeger';
  }
  Get(traceId: string): Promise<EventModel[]> {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}
