import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginResolver } from './login/login.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login/', pathMatch: 'full' },
      { path: 'login/:token', component: LoginComponent, resolve: { LoginResolver: LoginResolver} },
      { path: 'progress', component: LandingPageComponent }
    ]
  }
];
