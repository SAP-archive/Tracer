
import { ZipkinProviderService } from './zipkin-provider.service';
import { TestBed } from '@angular/core/testing';

describe('ZipkinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZipkinProviderService = TestBed.get(ZipkinProviderService);
    expect(service).toBeTruthy();
  });
});
