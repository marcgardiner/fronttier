import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultipleTextComponent } from './question-multiple-text.component';

describe('QuestionMultipleTextComponent', () => {
  let component: QuestionMultipleTextComponent;
  let fixture: ComponentFixture<QuestionMultipleTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMultipleTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultipleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
