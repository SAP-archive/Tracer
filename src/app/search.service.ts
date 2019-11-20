import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from './model/event-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  public async GetFlow(callID: string, aggregate: boolean): Promise<EventModel[]> {
    if (environment.searchServiceUrl === 'http://YourSearchService.com/v1/Search') {
      throw new Error('No searchServiceUrl define in your environment files.');
    }
    const url = `${environment.searchServiceUrl}?callID=${callID}&aggregate=${aggregate}`;
    return await this.httpClient.get<EventModel[]>(url).toPromise();
  }


}
