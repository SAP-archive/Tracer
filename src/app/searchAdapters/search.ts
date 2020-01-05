import { EventModel } from '../model/event-model';

export interface Search {

  Get(traceId: string): Promise<EventModel[]>;
}
