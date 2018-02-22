import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeaheadComponent } from './question-typeahead.component';

describe('QuestionTypeaheadComponent', () => {
  let component: QuestionTypeaheadComponent;
  let fixture: ComponentFixture<QuestionTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
