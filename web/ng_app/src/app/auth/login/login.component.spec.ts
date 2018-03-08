import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../auth.routing';
import { AuthComponent } from '../auth.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../../shared/auth.service';
import { UserAuthService } from '../../shared/user-auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        FooterComponent ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
          AuthService,
          UserAuthService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.userData = {
        user: {}
      };
    });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
