import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDragdropComponent } from './question-dragdrop.component';

describe('QuestionDragdropComponent', () => {
  let component: QuestionDragdropComponent;
  let fixture: ComponentFixture<QuestionDragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDragdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDragdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
