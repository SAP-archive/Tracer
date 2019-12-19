import { EventModel } from '../model/event-model';

export interface Search {

  Get(callID: string): Promise<EventModel[]>;
}
