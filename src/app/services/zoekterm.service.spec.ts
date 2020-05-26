import { TestBed } from '@angular/core/testing';

import { ZoektermService } from './zoekterm.service';

describe('ZoektermService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZoektermService = TestBed.get(ZoektermService);
    expect(service).toBeTruthy();
  });
});
