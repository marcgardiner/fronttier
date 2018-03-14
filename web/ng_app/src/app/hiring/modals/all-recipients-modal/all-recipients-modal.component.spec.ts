import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecipientsModalComponent } from './all-recipients-modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularDependenciesModule } from '../../../shared/angular-dependencies.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../hiring.routing';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { AddApplicantsComponent } from '../../add-applicants/add-applicants.component';
import { HiringComponent } from '../../hiring.component';
import { InviteComponent } from '../../invite/invite.component';
import { FullPreviewComponent } from '../../add-applicants/full-preview/full-preview.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthService } from '../../../shared/auth.service';
import { UserAuthService } from '../../../shared/user-auth.service';
import { RecipientsService } from '../../shared/recipients.service';
import { APP_BASE_HREF } from '@angular/common';
import { InvitationsService } from '../../../shared/invitations.service';

describe('AllRecipientsModalComponent', () => {
  let component: AllRecipientsModalComponent;
  let fixture: ComponentFixture<AllRecipientsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        AngularDependenciesModule,
        NgbModule.forRoot()
      ],
      declarations: [
        HeaderComponent,
        FooterComponent,
        AddApplicantsComponent,
        HiringComponent,
        InviteComponent,
        AllRecipientsModalComponent,
        FullPreviewComponent,
        DashboardComponent],
      providers: [
        AuthService,
        UserAuthService,
        RecipientsService,
        InvitationsService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRecipientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
