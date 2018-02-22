import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultiselectComponent } from './question-multiselect.component';

describe('QuestionMultiselectComponent', () => {
  let component: QuestionMultiselectComponent;
  let fixture: ComponentFixture<QuestionMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
