import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSingleselectComponent } from './question-singleselect.component';
import { AngularDependenciesModule } from '../../../../shared/angular-dependencies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionSingleselectComponent', () => {
  let component: QuestionSingleselectComponent;
  let fixture: ComponentFixture<QuestionSingleselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        BrowserAnimationsModule
      ],
      declarations: [ QuestionSingleselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSingleselectComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.question = {
        options: [],
        answers: [],
        component: QuestionSingleselectComponent,
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
