import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoektermDeleteDialogComponent } from './zoekterm-delete-dialog.component';

describe('ZoektermDeleteDialogComponent', () => {
  let component: ZoektermDeleteDialogComponent;
  let fixture: ComponentFixture<ZoektermDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoektermDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoektermDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
