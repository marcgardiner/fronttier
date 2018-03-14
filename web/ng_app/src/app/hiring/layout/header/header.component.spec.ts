import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../../hiring.routing';
import { AngularDependenciesModule } from '../../../shared/angular-dependencies.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from '../footer/footer.component';
import { AddApplicantsComponent } from '../../add-applicants/add-applicants.component';
import { HiringComponent } from '../../hiring.component';
import { AllRecipientsModalComponent } from '../../modals/all-recipients-modal/all-recipients-modal.component';
import { InviteComponent } from '../../invite/invite.component';
import { FullPreviewComponent } from '../../add-applicants/full-preview/full-preview.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthService } from '../../../shared/auth.service';
import { UserAuthService } from '../../../shared/user-auth.service';
import { RecipientsService } from '../../shared/recipients.service';
import { APP_BASE_HREF } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
