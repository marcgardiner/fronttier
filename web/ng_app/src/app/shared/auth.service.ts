import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from './user-auth.service';
import { Applicant } from './dictionary/applicant';
import { Exempler } from './dictionary/exempler';
import { HiringManager } from './dictionary/hiring-manager';
import { decode } from 'jsonwebtoken';
import { UserDictionaryInterface } from './dictionary/user-dictionary.interface';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  isLoggedIn: boolean;
  loginErrorFlag = false;
  redirectUrl = '';
  loggedInUser = {};
  userData: any = {
    user: {
      first_name: ''
    },
    landing_page: {
      messages: []
    },
    survey_complete: {
      messages: []
    }
  };

  private token: string = null;


  constructor(private userAuthService: UserAuthService,
    private router: Router) {
    console.log('************** init auth service');
    console.log('');
    console.log('/************** init auth service');
    this.userData = this.getUserFromCache();
  }

  checkIfLoggedIn() {
    return (this.isLoggedIn = this.isValidToken(this.token));
  }

  getToken() {
    return this.token || window.localStorage.getItem('token') || null;
  }
  getUserFromCache() {
    // console.log(JSON.parse(window.localStorage.getItem('user')));
    return JSON.parse(window.localStorage.getItem('user')) || this.userData;
  }

  parseToken(token: string) {
    return decode(token);
  }

  getTokenExpireDate(token: string): Object {
    const decoded = this.parseToken(token);
    if (!decoded.hasOwnProperty('exp') || decoded === {}) {
      return null;
    }
    const date = moment(0);
    date.utc().seconds(decoded.exp);
    return date;
  }

  isValidToken(token: string, offsetSeconds = 0): boolean {
    const date = this.getTokenExpireDate(token);
    if (!date) {
      return false;
    }
    return (date.valueOf() > (moment().valueOf() + (offsetSeconds * 1000)));
  }

  getLoggedInUser(): Object {
    return this.parseToken(this.getToken());
  }

  getUserType(userData): UserDictionaryInterface {
    let userType;
    if (userData.user.type === 'candidate' || userData.user.type === 'applicant') {
      console.log('candidate');
      userType = Applicant;
    } else if (userData.user.type === 'exemplar') {
      console.log('exemplar');
      userType = Exempler;
    } else if (userData.user.type === 'hiring_manager') {
      console.log('hiring manager');
      userType = HiringManager;
    }
    return Object.assign({}, userData, userType);
  }

  saveTokenToCache(accessToken: string) {
    this.token = accessToken || null;
    window.localStorage.setItem('token', this.token);
  }

  saveUserDataToCache(user) {
    this.userData = user;
    window.localStorage.setItem('user', JSON.stringify(this.userData));
  }

  clearCache() {
    window.localStorage.clear();
    this.token = null;
    this.isLoggedIn = false;
  }

  updateUser(user) {
    this.userData.user = user;
    this.saveUserDataToCache(this.userData);
  }

  getApplicantType(token) {
    console.log('updateing applicant');
    return Observable.create(observer => {
      this.userAuthService.getSurveyUser(token)
        .subscribe((response: any) => {
          console.log('response', response);
          this.userData.user.type = response.type;
          this.saveUserDataToCache(this.getUserType(this.userData));
          observer.next(this.userData);
          observer.complete();
        }, (err) => {
          observer.error(Observable.throw(err));
        });
    });
  }

  getUserFromToken(token): any {
    return Observable.create(observer => {
      this.userAuthService.getUser(token)
        .subscribe((response: any) => {
          this.saveTokenToCache(token);
          this.saveUserDataToCache(this.getUserType(response));
          observer.next(this.userData);
          observer.complete();
        }, (err) => {
          observer.error(Observable.throw(err));
        });
    });
  }

  // login(data: { email: string, password: string, isRemember?: boolean } = null): Observable<boolean> {

  // return Observable.create(observer => {
  //   this.userAuthService.login(data)
  //     .subscribe((response: any) => {
  //       this.isLoggedIn = false;
  //       if (!response['error']) {
  //         this.authenticateViaToken(response.data.token);
  //       }
  //       observer.next(this.isLoggedIn);
  //       observer.complete();
  //     }, (err) => {
  //       observer.error(Observable.throw(err));
  //     });
  // });
  // }

  logout(): void {
    this.redirectUrl = 'auth/' + (this.getToken() ? 'login/' + this.getToken() : 'access-login');
    console.log(this.redirectUrl);
    this.clearCache();
    this.router.navigate([this.redirectUrl]);
    this.redirectUrl = '';
  }

}
