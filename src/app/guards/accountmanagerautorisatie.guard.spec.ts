import { TestBed, async, inject } from '@angular/core/testing';

import { AccountmanagerAutorisatieGuard } from './accountmanagerautorisatie.guard';

describe('AccountmanagerautorisatieGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountmanagerAutorisatieGuard]
    });
  });

  it('should ...', inject([AccountmanagerAutorisatieGuard], (guard: AccountmanagerAutorisatieGuard) => {
    expect(guard).toBeTruthy();
  }));
});
