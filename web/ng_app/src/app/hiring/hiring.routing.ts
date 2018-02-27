import { HiringComponent } from './hiring.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';

export const appRoutes: Routes = [
    {
      path: '',
      component: HiringComponent,
      children: [
        { path: '', redirectTo: 'add', pathMatch: 'full' },
        { path: 'add', component: AddApplicantsComponent },
        { path: 'dashboard', component: DashboardComponent }
      ]
    }
  ];
