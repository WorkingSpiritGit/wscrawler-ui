import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacatureComponent } from './vacature.component';

describe('VacatureComponent', () => {
  let component: VacatureComponent;
  let fixture: ComponentFixture<VacatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
