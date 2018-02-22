import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLimitedselectComponent } from './question-limitedselect.component';

describe('QuestionLimitedselectComponent', () => {
  let component: QuestionLimitedselectComponent;
  let fixture: ComponentFixture<QuestionLimitedselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLimitedselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLimitedselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
