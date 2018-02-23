import { InviteComponent } from './invite.component';
import { Routes } from '@angular/router';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';

export const appRoutes: Routes = [
    {
      path: '',
      component: InviteComponent,
      children: [
        { path: '', redirectTo: 'add', pathMatch: 'full' },
        { path: 'add', component: AddApplicantsComponent },
      ]
    }
  ];
