import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteComponent } from './invite.component';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './invite.routing';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from '../auth/layout/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [InviteComponent,
    AddApplicantsComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class InviteModule { }
