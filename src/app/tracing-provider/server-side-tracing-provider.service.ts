import { Injectable } from '@angular/core';
import { TracingProvider } from './tracingProvider';
import { environment } from 'src/environments/environment';
import { EventModel } from '../model/event-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerSideTracingProviderService implements TracingProvider {
  constructor(private httpClient: HttpClient) { }

  async Get(traceId: string): Promise<EventModel[]> {
    const url = `${environment.tracingProvider.url}/trace/${traceId}`;
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

  GetName(): string {
    return 'serverSide';
  }

}
