import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoekschermComponent } from './zoekscherm.component';

describe('ZoekschermComponent', () => {
  let component: ZoekschermComponent;
  let fixture: ComponentFixture<ZoekschermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoekschermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoekschermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
