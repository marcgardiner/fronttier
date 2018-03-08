import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLimitedselectComponent } from './question-limitedselect.component';
import { AngularDependenciesModule } from '../../../../shared/angular-dependencies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionLimitedselectComponent', () => {
  let component: QuestionLimitedselectComponent;
  let fixture: ComponentFixture<QuestionLimitedselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        BrowserAnimationsModule
      ],
      declarations: [ QuestionLimitedselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLimitedselectComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.question = {
        options: [],
        answers: [],
        component: QuestionLimitedselectComponent,
        questionLabel: ''
      };
    });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
