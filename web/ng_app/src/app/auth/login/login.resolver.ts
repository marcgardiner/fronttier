import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class LoginResolver implements Resolve<any> {
  constructor(private authService: AuthService,
  private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    if (!route.paramMap.get('token')) {
      this.router.navigate(['auth/access-login']);
      return;
    }
    return this.authService.getUserFromToken(route.paramMap.get('token'));
  }
}
