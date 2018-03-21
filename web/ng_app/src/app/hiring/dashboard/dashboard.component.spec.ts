import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { appRoutes } from '../hiring.routing';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { AddApplicantsComponent } from '../add-applicants/add-applicants.component';
import { HiringComponent } from '../hiring.component';
import { InviteComponent } from '../invite/invite.component';
import { AllRecipientsModalComponent } from '../modals/all-recipients-modal/all-recipients-modal.component';
import { FullPreviewComponent } from '../add-applicants/full-preview/full-preview.component';
import { RecipientsService } from '../shared/recipients.service';
import { InvitationsService } from '../../shared/invitations.service';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { UserAuthService } from '../../shared/user-auth.service';
import { JobService } from '../../shared/job.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: { DashboardResolver: { jobs : [{
      surveys: {}
    }]} } }
  };
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
        RecipientsService,
        InvitationsService,
        AuthService,
        UserAuthService,
        JobService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
