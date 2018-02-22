import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRankorderComponent } from './question-rankorder.component';

describe('QuestionRankorderComponent', () => {
  let component: QuestionRankorderComponent;
  let fixture: ComponentFixture<QuestionRankorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRankorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRankorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
