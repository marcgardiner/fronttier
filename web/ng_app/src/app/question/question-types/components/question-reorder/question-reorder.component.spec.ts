import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReOrderComponent } from './question-reorder.component';
import { AngularDependenciesModule } from '../../../../shared/angular-dependencies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule, DragulaService } from 'ng-dragula/ng-dragula';

describe('QuestionReOrderComponent', () => {
  let component: QuestionReOrderComponent;
  let fixture: ComponentFixture<QuestionReOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        BrowserAnimationsModule,
        DragulaModule
      ],
      declarations: [ QuestionReOrderComponent ],
      providers: [
        DragulaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReOrderComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.question = {
        options: [],
        answers: [],
        component: QuestionReOrderComponent,
        questionLabel: '',
        answerFlag: false
      };
    });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
