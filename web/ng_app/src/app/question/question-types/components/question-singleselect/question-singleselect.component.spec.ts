import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSingleselectComponent } from './question-singleselect.component';

describe('QuestionSingleselectComponent', () => {
  let component: QuestionSingleselectComponent;
  let fixture: ComponentFixture<QuestionSingleselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSingleselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSingleselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
