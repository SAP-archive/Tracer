import { TestBed } from '@angular/core/testing';

import { appSettings } from './app-settings.service';

describe('appSettings', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: appSettings = TestBed.get(appSettings);
    expect(service).toBeTruthy();
  });
});
