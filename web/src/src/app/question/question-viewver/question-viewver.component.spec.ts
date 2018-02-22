import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewverComponent } from './question-viewver.component';

describe('QuestionViewverComponent', () => {
  let component: QuestionViewverComponent;
  let fixture: ComponentFixture<QuestionViewverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionViewverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
