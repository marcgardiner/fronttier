import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringComponent } from './hiring.component';
import { AddApplicantsComponent } from './add-applicants/add-applicants.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AllRecipientsModalComponent } from './modals/all-recipients-modal/all-recipients-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteComponent } from './invite/invite.component';
import { AngularDependenciesModule } from '../shared/angular-dependencies.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './hiring.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APP_BASE_HREF } from '@angular/common';
import { FullPreviewComponent } from './add-applicants/full-preview/full-preview.component';
import { AuthService } from '../shared/auth.service';
import { UserAuthService } from '../shared/user-auth.service';
import { RecipientsService } from './shared/recipients.service';

describe('HiringComponent', () => {
  let component: HiringComponent;
  let fixture: ComponentFixture<HiringComponent>;

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
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
