
import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';

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
    loadChildren: './question/question.module#QuestionModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'hiring',
    loadChildren: './hiring/hiring.module#HiringModule',
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  }
];
