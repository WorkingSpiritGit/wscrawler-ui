import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoektermComponent } from './zoekterm.component';

describe('ZoektermComponent', () => {
  let component: ZoektermComponent;
  let fixture: ComponentFixture<ZoektermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoektermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoektermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
