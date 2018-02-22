import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDropdownSingleselectComponent } from './question-dropdown-singleselect.component';

describe('QuestionDropdownSingleselectComponent', () => {
  let component: QuestionDropdownSingleselectComponent;
  let fixture: ComponentFixture<QuestionDropdownSingleselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDropdownSingleselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDropdownSingleselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
