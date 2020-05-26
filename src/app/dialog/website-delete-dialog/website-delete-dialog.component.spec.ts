import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteDeleteDialogComponent } from './website-delete-dialog.component';

describe('WebsiteDeleteDialogComponent', () => {
  let component: WebsiteDeleteDialogComponent;
  let fixture: ComponentFixture<WebsiteDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
