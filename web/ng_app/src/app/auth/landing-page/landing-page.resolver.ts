import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { SurveyService } from '../../shared/survey.service';

@Injectable()
export class LandingPageResolver implements Resolve<any> {
    constructor(private authService: AuthService,
        private router: Router,
        private surveyService: SurveyService) { }

    resolve(route: ActivatedRouteSnapshot) {
        const loggedInUser = this.authService.getUserFromCache();
        if (loggedInUser.user.type === 'hiring_manager') {
          return this.authService.userData;
        }
        this.authService.saveUserDataToCache(this.authService.getUserType(this.surveyService.getSurvey()));
        return this.authService.userData;
    }
}
