import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultiselectComponent } from './question-multiselect.component';
import { AngularDependenciesModule } from '../../../../shared/angular-dependencies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionMultiselectComponent', () => {
  let component: QuestionMultiselectComponent;
  let fixture: ComponentFixture<QuestionMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        BrowserAnimationsModule
      ],
      declarations: [ QuestionMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultiselectComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.question = {
        options: [],
        answers: [],
        component: QuestionMultiselectComponent,
        questionLabel: '',
        answersFlag: false
      };
    });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
