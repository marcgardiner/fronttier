import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringManagersComponent } from './hiring-managers.component';

describe('HiringManagersComponent', () => {
  let component: HiringManagersComponent;
  let fixture: ComponentFixture<HiringManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
