import { TestBed } from '@angular/core/testing';

import { AuthenticatieService } from './authenticatie.service';

describe('AuthenticatieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticatieService = TestBed.get(AuthenticatieService);
    expect(service).toBeTruthy();
  });
});
