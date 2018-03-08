import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './question.routing';
import { AngularDependenciesModule } from '../shared/angular-dependencies.module';
import { QuestionViewverComponent } from './question-viewver/question-viewver.component';
import { SegmentCompleteComponent } from './segments/segment-complete/segment-complete.component';
import { QuestionTypeaheadComponent } from './question-types/components/question-typeahead/question-typeahead.component';
import { APP_BASE_HREF } from '@angular/common';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        AngularDependenciesModule
      ],
      declarations: [ QuestionComponent,
        QuestionComponent,
        QuestionViewverComponent,
        HeaderComponent,
        SegmentCompleteComponent,
        QuestionTypeaheadComponent
       ],
       providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
