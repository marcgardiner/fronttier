import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDropdownSingleselectComponent } from './question-dropdown-singleselect.component';
import { AngularDependenciesModule } from '../../../../shared/angular-dependencies.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionDropdownSingleselectComponent', () => {
  let component: QuestionDropdownSingleselectComponent;
  let fixture: ComponentFixture<QuestionDropdownSingleselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        BrowserAnimationsModule
      ],
      declarations: [QuestionDropdownSingleselectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDropdownSingleselectComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.question = {
        options: [],
        answers: { answer: '' },
        component: QuestionDropdownSingleselectComponent,
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
