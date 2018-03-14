import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeaheadComponent } from './question-typeahead.component';
import { AngularDependenciesModule } from '../../../../shared/angular-dependencies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionTypeaheadComponent', () => {
  let component: QuestionTypeaheadComponent;
  let fixture: ComponentFixture<QuestionTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        BrowserAnimationsModule
      ],
      declarations: [ QuestionTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeaheadComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.question = {
        options: [],
        answers: [],
        component: QuestionTypeaheadComponent,
        questionLabel: '',
      };
    });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
