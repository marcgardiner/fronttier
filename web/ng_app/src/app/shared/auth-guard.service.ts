import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(next);
        console.log(this.authService.getToken());
        const loggedInUser = this.authService.getUserFromCache();
        const token = this.authService.getToken();
        if (next.routeConfig.path === 'hiring') {
            if (loggedInUser.user.type !== 'hiring_manager') {
                this.router.navigate(['auth/login/' + token]);
                return false;
            }
            return true;
        } else if (next.routeConfig.path === 'question') {
            if (loggedInUser.user.type !== 'exemplar' &&
                loggedInUser.user.type !== 'candidate' &&
                loggedInUser.user.type !== 'hiring_manager') {
                this.router.navigate(['auth/login/' + token]);
                return false;
            }
            return true;
        }
        if (next.routeConfig.path === 'admin') {
            if (loggedInUser.user.type !== 'administrator') {
                this.router.navigate(['auth/login/' + token]);
                return false;
            }
            return true;
        }

        // store the attempted URL for redirecting
        // this.authService.redirectUrl = state.url;
        // console.log(this.authService.checkIfLoggedIn());
        // if (!this.authService.checkIfLoggedIn()) {
        //   this.router.navigate(['auth/login']); // navigate to the login page
        //   return false;
        // }
        return true;
    }

}
