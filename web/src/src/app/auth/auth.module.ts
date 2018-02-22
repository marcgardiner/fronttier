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
    FooterComponent]
})
export class AuthModule { }
