import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringComponent } from './hiring.component';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './hiring.routing';
import { HeaderComponent } from './layout/header/header.component';
import { AllRecipientsModalComponent } from './modals/all-recipients-modal/all-recipients-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteComponent } from './invite/invite.component';
import { AngularDependenciesModule } from '../shared/angular-dependencies.module';
import { FooterComponent } from './layout/footer/footer.component';
import { RecipientsService } from './shared/recipients.service';
import { EditRecipientGuard } from './shared/edit-recipient.guard';
import { FullPreviewComponent } from './add-applicants/full-preview/full-preview.component';
import { InvitationsService } from '../shared/invitations.service';
import { SurveyService } from '../shared/survey.service';

@NgModule({
  entryComponents: [
    AllRecipientsModalComponent,
  ],
  imports: [
    CommonModule,
    AngularDependenciesModule,
    RouterModule.forChild(appRoutes),
    NgbModule,
    FormsModule
  ],
  declarations: [
    HiringComponent,
    AddApplicantsComponent,
    HeaderComponent,
    AllRecipientsModalComponent,
    DashboardComponent,
    InviteComponent,
    FooterComponent,
    FullPreviewComponent
  ],
  providers: [
    RecipientsService,
    EditRecipientGuard,
    InvitationsService,
    SurveyService
  ]
})
export class HiringModule { }
