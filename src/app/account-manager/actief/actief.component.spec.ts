import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiefComponent } from './actief.component';

describe('ActiefComponent', () => {
  let component: ActiefComponent;
  let fixture: ComponentFixture<ActiefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
