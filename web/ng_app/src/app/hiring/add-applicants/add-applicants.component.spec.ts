import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantsComponent } from './add-applicants.component';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipientsService } from '../shared/recipients.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../hiring.routing';
import { HiringComponent } from '../hiring.component';
import { InviteComponent } from '../invite/invite.component';
import { AllRecipientsModalComponent } from '../modals/all-recipients-modal/all-recipients-modal.component';
import { FullPreviewComponent } from './full-preview/full-preview.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { InvitationsService } from '../../shared/invitations.service';

describe('AddApplicantsComponent', () => {
  let component: AddApplicantsComponent;
  let fixture: ComponentFixture<AddApplicantsComponent>;

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
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
