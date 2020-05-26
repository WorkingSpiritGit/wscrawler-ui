import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GebruikerDeleteDialogComponent } from './gebruiker-delete-dialog.component';

describe('GebruikerDeleteDialogComponent', () => {
  let component: GebruikerDeleteDialogComponent;
  let fixture: ComponentFixture<GebruikerDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GebruikerDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GebruikerDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
