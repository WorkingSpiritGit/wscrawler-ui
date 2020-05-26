import { TestBed } from '@angular/core/testing';

import { ZoekopdrachtService } from './zoekopdracht.service';

describe('ZoekopdrachtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZoekopdrachtService = TestBed.get(ZoekopdrachtService);
    expect(service).toBeTruthy();
  });
});
