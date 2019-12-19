import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from './model/event-model';
import { environment } from 'src/environments/environment';
import { ZipkinService } from './searchAdapters/zipkin.service';

@Injectable({
  providedIn: 'root'
})
// the controller between the search adapter, contain default search behavior
export class SearchService {

  constructor(private httpClient: HttpClient, private zipkinAdapter: ZipkinService) { }

  public async GetFlow(callID: string, aggregate: boolean): Promise<EventModel[]> {
    if (environment.zipkinUrl != null) {
      return this.zipkinAdapter.Get(callID);
    }

    const url = `${environment.searchServiceUrl}?callID=${callID}&aggregate=${aggregate}`;
    return await this.httpClient.get<EventModel[]>(url).toPromise();
  }


}
