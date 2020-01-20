
import { TestBed } from '@angular/core/testing';
import { JaegerProviderService } from './jaeger-provider.service';

describe('JaegerProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JaegerProviderService = TestBed.get(JaegerProviderService);
    expect(service).toBeTruthy();
  });
});
