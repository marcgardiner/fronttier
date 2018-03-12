import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from './user-auth.service';
import { Applicant } from './dictionary/applicant';
import { Exempler } from './dictionary/exempler';
import { HiringManager } from './dictionary/hiring-manager';
import { decode } from 'jsonwebtoken';
import { UserDictionaryInterface } from './dictionary/user-dictionary.interface';
import * as moment from 'moment';


@Injectable()
export class AuthService {

  isLoggedIn: boolean;
  redirectUrl = '';
  loggedInUser = {};
  userData: Object = null;

  private token: string = null;

  onAuthChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private userAuthService: UserAuthService) {
    console.log('************** init auth service');
    console.log('');
    console.log('/************** init auth service');
  }

  checkIfLoggedIn() {
    return (this.isLoggedIn = this.isValidToken(this.token));
  }

  getToken() {
    return this.token || window.localStorage.getItem('token') || null;
  }
  getUserFromCache() {
    return this.userData || JSON.parse(window.localStorage.getItem('user')) || null;
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
    if (userData.user.type === 'applicant') {
      userType = Applicant;
    } else if (userData.user.type === 'administrator') {
      userType = Exempler;
    } else if (userData.user.type === 'hiring_manager') {
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
    this.redirectUrl = '';
    this.isLoggedIn = false;
  }

  authenticateViaToken(token: string) {
    this.isLoggedIn = this.isValidToken(token);
    if (this.isLoggedIn) {
      this.saveTokenToCache(token);
    }
    this.onAuthChange.emit(this.isLoggedIn);
    return this.isLoggedIn;
  }

  getUserFromToken(token) {
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
    /*
    this.userAuthService.logout().subscribe((response) => {
        if (!response['error']) {
            this.clearCache();
            this.onAuthChange.emit(this.isLoggedIn);
        }
    });
    */

    this.clearCache();
    this.onAuthChange.emit(this.isLoggedIn);
  }

}