import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { HeaderComponent } from './layout/header/header.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AngularDependenciesModule } from '../shared/angular-dependencies.module';
import { WithoutTokenLoginComponent } from './without-token-login/without-token-login.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        AngularDependenciesModule
      ],
      declarations: [
        LoginComponent,
        LandingPageComponent,
        AuthComponent,
        HeaderComponent,
        FooterComponent,
        WithoutTokenLoginComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
