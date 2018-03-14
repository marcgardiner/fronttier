import { HiringComponent } from './hiring.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteComponent } from './invite/invite.component';
import { Routes } from '@angular/router';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';
import { AllRecipientsModalComponent } from './modals/all-recipients-modal/all-recipients-modal.component';
import { EditRecipientGuard } from './shared/edit-recipient.guard';
import { FullPreviewComponent } from './add-applicants/full-preview/full-preview.component';

export const appRoutes: Routes = [
    {
      path: '',
      component: HiringComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'invite', component: InviteComponent },
        { path: 'add', component: AddApplicantsComponent, canActivate: [EditRecipientGuard] },
        { path: 'edit', component: AllRecipientsModalComponent, canActivate: [EditRecipientGuard] },
        { path: 'full-preview', component: FullPreviewComponent },
        { path: 'dashboard', component: DashboardComponent }
      ]
    }
  ];
