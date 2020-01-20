import { TestBed } from '@angular/core/testing';

import { ServerSideTracingProviderService } from './server-side-tracing-provider.service';

describe('ServerSideTracingProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerSideTracingProviderService = TestBed.get(ServerSideTracingProviderService);
    expect(service).toBeTruthy();
  });
});
