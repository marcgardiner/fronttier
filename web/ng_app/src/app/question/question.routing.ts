import { QuestionComponent } from './question.component';
import { Routes } from '@angular/router';
import { QuestionViewverComponent } from './question-viewver/question-viewver.component';

export const appRoutes: Routes = [
    {
      path: '',
      component: QuestionComponent,
      children: [
        { path: '', redirectTo: 'view', pathMatch: 'full' },
        { path: 'view', component: QuestionViewverComponent }
      ]
    }
  ];
