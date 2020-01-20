import { EventModel } from '../model/event-model';

export interface TracingProvider {

  Get(traceId: string): Promise<EventModel[]>;
  GetName(): string;

}
