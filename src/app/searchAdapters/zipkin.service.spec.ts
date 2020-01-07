import { TestBed } from '@angular/core/testing';

import { ZipkinService } from './zipkin.service';

describe('ZipkinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZipkinService = TestBed.get(ZipkinService);
    expect(service).toBeTruthy();
  });
});
