import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiefComponent } from './archief.component';

describe('ArchiefComponent', () => {
  let component: ArchiefComponent;
  let fixture: ComponentFixture<ArchiefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
