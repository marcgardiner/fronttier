import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentCompleteComponent } from './segment-complete.component';
import { AuthService } from '../../../shared/auth.service';
import { UserAuthService } from '../../../shared/user-auth.service';
import { AngularDependenciesModule } from '../../../shared/angular-dependencies.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../question.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionComponent } from '../../question.component';
import { QuestionViewverComponent } from '../../question-viewver/question-viewver.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { QuestionFieldService } from '../../../shared/question-field.service';
import { SegmentService } from '../segments.service';
import { ThinkingStateService } from '../../../shared/thinking-state.service';
import { APP_BASE_HREF } from '@angular/common';

describe('SegmentCompleteComponent', () => {
  let component: SegmentCompleteComponent;
  let fixture: ComponentFixture<SegmentCompleteComponent>;

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
        SegmentCompleteComponent
      ],
      providers: [
        QuestionFieldService,
        ThinkingStateService,
        SegmentService,
        AuthService,
        UserAuthService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
