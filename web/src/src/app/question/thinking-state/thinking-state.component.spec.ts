import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkingStateComponent } from './thinking-state.component';

describe('ThinkingStateComponent', () => {
  let component: ThinkingStateComponent;
  let fixture: ComponentFixture<ThinkingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkingStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
