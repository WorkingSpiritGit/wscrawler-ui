import { TestBed } from '@angular/core/testing';

import { GebruikerService } from './gebruiker.service';

describe('GebruikerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GebruikerService = TestBed.get(GebruikerService);
    expect(service).toBeTruthy();
  });
});
