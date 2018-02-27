import { HiringComponent } from './hiring.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteComponent } from './invite/invite.component';
import { Routes } from '@angular/router';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';

export const appRoutes: Routes = [
    {
      path: '',
      component: HiringComponent,
      children: [
        { path: '', redirectTo: 'invite', pathMatch: 'full' },
        { path: 'invite', component: InviteComponent },
        { path: 'add', component: AddApplicantsComponent },
        { path: 'dashboard', component: DashboardComponent }
      ]
    }
  ];
