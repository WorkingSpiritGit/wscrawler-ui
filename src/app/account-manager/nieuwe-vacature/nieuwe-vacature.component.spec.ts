import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuweVacatureComponent } from './nieuwe-vacature.component';

describe('NieuweVacatureComponent', () => {
  let component: NieuweVacatureComponent;
  let fixture: ComponentFixture<NieuweVacatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NieuweVacatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuweVacatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
