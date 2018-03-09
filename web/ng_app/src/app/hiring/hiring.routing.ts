import { HiringComponent } from './hiring.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteComponent } from './invite/invite.component';
import { Routes } from '@angular/router';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';
import { AllRecipientsModalComponent } from './modals/all-recipients-modal/all-recipients-modal.component';
import { EditRecipientGuard } from './shared/edit-recipient.guard';

export const appRoutes: Routes = [
    {
      path: '',
      component: HiringComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'invite', component: InviteComponent },
        { path: 'add', component: AddApplicantsComponent },
        { path: 'edit', component: AllRecipientsModalComponent, canActivate: [EditRecipientGuard] },
        { path: 'dashboard', component: DashboardComponent }
      ]
    }
  ];
