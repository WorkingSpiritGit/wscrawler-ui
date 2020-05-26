import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacatureTabelComponent } from './vacature-tabel.component';

describe('VacatureTabelComponent', () => {
  let component: VacatureTabelComponent;
  let fixture: ComponentFixture<VacatureTabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacatureTabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacatureTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
