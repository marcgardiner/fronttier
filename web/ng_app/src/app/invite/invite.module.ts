import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteComponent } from './invite.component';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './invite.routing';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from '../auth/layout/footer/footer.component';
import { AllRecipientsModalComponent } from './modals/all-recipients-modal/all-recipients-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [
    AllRecipientsModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    NgbModule,
    FormsModule
  ],
  declarations: [InviteComponent,
    AddApplicantsComponent,
    HeaderComponent,
    FooterComponent,
    AllRecipientsModalComponent
  ]
})
export class InviteModule { }
