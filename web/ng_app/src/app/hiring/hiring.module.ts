import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringComponent } from './hiring.component';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './hiring.routing';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from '../auth/layout/footer/footer.component';
import { AllRecipientsModalComponent } from './modals/all-recipients-modal/all-recipients-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

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
  declarations: [HiringComponent,
    AddApplicantsComponent,
    HeaderComponent,
    FooterComponent,
    AllRecipientsModalComponent,
    DashboardComponent
  ]
})
export class HiringModule { }
