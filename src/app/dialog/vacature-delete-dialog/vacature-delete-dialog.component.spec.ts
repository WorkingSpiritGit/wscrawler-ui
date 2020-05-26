import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacatureDeleteDialogComponent } from './vacature-delete-dialog.component';

describe('VacatureDeleteDialogComponent', () => {
  let component: VacatureDeleteDialogComponent;
  let fixture: ComponentFixture<VacatureDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacatureDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacatureDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
