import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './auth.routing';
import { AngularDependenciesModule } from '../shared/angular-dependencies.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserAuthService } from '../shared/user-auth.service';
import { AuthService } from '../shared/auth.service';
import { LoginResolver } from './login/login.resolver';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    AngularDependenciesModule
  ],
  declarations: [LoginComponent,
    LandingPageComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent],
    providers: [
      // AuthService,
      LoginResolver
    ]
})
export class AuthModule { }
