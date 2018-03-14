import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutTokenLoginComponent } from './without-token-login.component';

describe('WithoutTokenLoginComponent', () => {
  let component: WithoutTokenLoginComponent;
  let fixture: ComponentFixture<WithoutTokenLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutTokenLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutTokenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
