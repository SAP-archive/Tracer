import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventModel } from './model/event-model';
import { environment } from 'src/environments/environment';
import { ZipkinService } from './searchAdapters/zipkin.service';

@Injectable({
  providedIn: 'root'
})
// the controller between the search adapter, contain default search behavior
export class SearchService {

  constructor(private httpClient: HttpClient, private zipkinAdapter: ZipkinService) { }

  public async GetFlow(traceId: string): Promise<EventModel[]> {
    if (environment.searchProvider.name === 'zipkin') {
      return this.zipkinAdapter.Get(traceId);
    }

    const url = `${environment.searchProvider.url}/trace/${traceId}`;
    try {
      return await this.httpClient.get<EventModel[]>(url).toPromise();

    } catch (error) {
      const ex = error as HttpErrorResponse;
      if (ex.status === 404) {
        return null;
      }
      throw error;
    }
  }
}


