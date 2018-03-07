import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class LoginResolver implements Resolve<any> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.authService.getUserFromToken(route.paramMap.get('token'));
  }
}
