import { Injectable, Inject } from '@angular/core';
import { EventModel } from './model/event-model';
import { environment } from 'src/environments/environment';
import { TracingProvider } from './tracing-provider/tracingProvider';

@Injectable({
  providedIn: 'root'
})

export class TracingProviderService {

  private TracingProvider: TracingProvider;
  private ErrorMessage: string;

  constructor(@Inject('TracingProviderService') providers: TracingProvider[]) {

    this.TracingProvider = providers.find(x => x.GetName() === environment.tracingProvider.name);
    this.ErrorMessage = 'Configuration required.'
      + `\n To enable search, please configure tracing provider (available providers: ${providers.map(x => x.GetName()).join(',')})`
      + '\n For more details: https://github.com/sap/Tracer#tracing-provider.';

    if (environment.docker) {
      this.ErrorMessage = 'Configuration required.'
      + `\n To enable search, please configure tracing provider (available providers: ${providers.map(x => x.GetName()).join(',')})`
      + '\n You can define tracing provider by providing  env TRACER_ENV_TracingProviderName ,TRACER_ENV_TracingProviderUrl.'
      + '\n For more details: https://github.com/sap/Tracer#tracing-provider.';
      }
  }

  public HasTracingProvider() {
    if (this.TracingProvider) {
      return true;
    }

    return false;
  }

  public GetErrorMessage() {
    return this.ErrorMessage;
  }

  public async GetFlow(traceId: string): Promise<EventModel[]> {

    if (this.HasTracingProvider()) {
      return await this.TracingProvider.Get(traceId);
    } else {
      throw new Error(this.ErrorMessage);
    }

  }
}

