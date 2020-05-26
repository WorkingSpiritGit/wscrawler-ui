import { TestBed } from '@angular/core/testing';

import { VacatureService } from './vacature.service';

describe('VacatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacatureService = TestBed.get(VacatureService);
    expect(service).toBeTruthy();
  });
});
