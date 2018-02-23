import { QuestionComponent } from './question.component';
import { Routes } from '@angular/router';
import { QuestionViewverComponent } from './question-viewver/question-viewver.component';
import { SegmentCompleteComponent } from './segments/segment-complete/segment-complete.component';

export const appRoutes: Routes = [
    {
      path: '',
      component: QuestionComponent,
      children: [
        { path: '', redirectTo: 'view', pathMatch: 'full' },
        { path: 'view', component: QuestionViewverComponent },
        { path: 'segment-complete', component: SegmentCompleteComponent }
      ]
    }
  ];
