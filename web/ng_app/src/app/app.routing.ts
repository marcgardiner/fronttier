
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'question',
    loadChildren: './question/question.module#QuestionModule'
  },
  {
    path: 'hiring',
    loadChildren: './hiring/hiring.module#HiringModule'
  }
];
