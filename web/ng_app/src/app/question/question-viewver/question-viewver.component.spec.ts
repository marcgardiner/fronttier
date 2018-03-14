import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewverComponent } from './question-viewver.component';
import { QuestionFieldService } from '../../shared/question-field.service';
import { ThinkingStateService } from '../../shared/thinking-state.service';
import { SegmentService } from '../segments/segments.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../question.routing';
import { QuestionComponent } from '../question.component';
import { SegmentCompleteComponent } from '../segments/segment-complete/segment-complete.component';
import { HeaderComponent } from '../layout/header/header.component';
import { QuestionMultiselectComponent } from '../question-types/components/question-multiselect/question-multiselect.component';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { UserAuthService } from '../../shared/user-auth.service';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { QuestionTypeaheadComponent } from '../question-types/components/question-typeahead/question-typeahead.component';

import { Type } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export interface ComponentData {
    type: Type<any>;
    properties?: {[property: string]: Object};
}

describe('QuestionViewverComponent', () => {
  let component: QuestionViewverComponent;
  let fixture: ComponentFixture<QuestionViewverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        AngularDependenciesModule,
        BrowserAnimationsModule
      ],
      declarations: [
        QuestionComponent,
        QuestionViewverComponent,
        HeaderComponent,
        SegmentCompleteComponent,
        QuestionTypeaheadComponent
      ],
      providers: [
        QuestionFieldService,
        ThinkingStateService,
        SegmentService,
        AuthService,
        UserAuthService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [QuestionTypeaheadComponent]
      }
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
