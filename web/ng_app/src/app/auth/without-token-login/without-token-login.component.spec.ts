import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutTokenLoginComponent } from './without-token-login.component';
import { AuthComponent } from '../auth.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../auth.routing';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { UserAuthService } from '../../shared/user-auth.service';

describe('WithoutTokenLoginComponent', () => {
  let component: WithoutTokenLoginComponent;
  let fixture: ComponentFixture<WithoutTokenLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        AngularDependenciesModule
      ],
      declarations: [ LoginComponent,
        AuthComponent,
        LandingPageComponent,
        HeaderComponent,
        FooterComponent,
        WithoutTokenLoginComponent ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
          AuthService,
          UserAuthService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutTokenLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
