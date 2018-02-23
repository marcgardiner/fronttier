import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { appRoutes } from './question.routing';
import { RouterModule } from '@angular/router';
import { QuestionViewverComponent } from './question-viewver/question-viewver.component';
import { HeaderComponent } from './layout/header/header.component';
import { QuestionFieldService } from '../shared/question-field.service';
import { QuestionMultiselectComponent } from './question-types/components/question-multiselect/question-multiselect.component';
import { QuestionSingleselectComponent } from './question-types/components/question-singleselect/question-singleselect.component';
import { QuestionTextComponent } from './question-types/components/question-text/question-text.component';
import { AngularDependenciesModule } from '../shared/angular-dependencies.module';
// tslint:disable-next-line:max-line-length
import { QuestionDropdownSingleselectComponent } from './question-types/components/question-dropdown-singleselect/question-dropdown-singleselect.component';
import { QuestionLimitedselectComponent } from './question-types/components/question-limitedselect/question-limitedselect.component';
import { QuestionReOrderComponent } from './question-types/components/question-reorder/question-reorder.component';
import {DragulaModule, DragulaService} from 'ng-dragula/ng-dragula';
import { QuestionMultipleTextComponent } from './question-types/components/question-multiple-text/question-multiple-text.component';
import { QuestionDragdropComponent } from './question-types/components/question-dragdrop/question-dragdrop.component';
import { QuestionRankorderComponent } from './question-types/components/question-rankorder/question-rankorder.component';
import { QuestionTypeaheadComponent } from './question-types/components/question-typeahead/question-typeahead.component';
import { ThinkingStateComponent } from './thinking-state/thinking-state.component';
import { ThinkingStateService } from '../shared/thinking-state.service';
import { SegmentCompleteComponent } from './segments/segment-complete/segment-complete.component';
import { SegmentService } from './segments/segments.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    AngularDependenciesModule,
    DragulaModule
  ],
  declarations: [
    QuestionComponent,
    QuestionViewverComponent,
    HeaderComponent,
    QuestionMultiselectComponent,
    QuestionSingleselectComponent,
    QuestionTextComponent,
    QuestionDropdownSingleselectComponent,
    QuestionLimitedselectComponent,
    QuestionReOrderComponent,
    QuestionMultipleTextComponent,
    QuestionDragdropComponent,
    QuestionRankorderComponent,
    QuestionTypeaheadComponent,
    ThinkingStateComponent,
    SegmentCompleteComponent
  ],
  entryComponents: [
    QuestionMultiselectComponent,
    QuestionSingleselectComponent,
    QuestionTextComponent,
    QuestionDropdownSingleselectComponent,
    QuestionLimitedselectComponent,
    QuestionReOrderComponent,
    QuestionMultipleTextComponent,
    QuestionDragdropComponent,
    QuestionRankorderComponent,
    QuestionTypeaheadComponent
  ],
  providers: [
    QuestionFieldService,
    DragulaService,
    ThinkingStateService,
    SegmentService
  ]
})
export class QuestionModule { }
