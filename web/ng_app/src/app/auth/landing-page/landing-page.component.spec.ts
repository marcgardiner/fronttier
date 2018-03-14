import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { UserAuthService } from '../../shared/user-auth.service';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { appRoutes } from '../auth.routing';
import { AuthComponent } from '../auth.component';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [ LandingPageComponent,
        AuthComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent ],
      providers: [
        AuthService,
        UserAuthService,
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
