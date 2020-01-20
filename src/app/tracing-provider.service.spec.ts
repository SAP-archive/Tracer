import { TestBed } from '@angular/core/testing';

import { TracingProviderService } from './tracing-provider.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TracingProviderService = TestBed.get(TracingProviderService);
    expect(service).toBeTruthy();
  });
});
