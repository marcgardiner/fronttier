import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserAuthService } from './user-auth.service';
import { Applicant } from './dictionary/applicant';
import { Exempler } from './dictionary/exempler';
import { HiringManager } from './dictionary/hiring-manager';
import { decode } from 'jsonwebtoken';
import { UserDictionaryInterface} from './dictionary/user-dictionary.interface';
import * as moment from 'moment';


@Injectable()
export class AuthService {

  isLoggedIn: boolean;
  redirectUrl = '';
  mockedData = {
    'last_login': null,
    'num_logins': 0,
    'survey': 'survey_repsonse_123',
    'token': 'login_123',
    'user': {
        'company': null,
        'email': 'bojack@horseman.com',
        'first_name': 'Bojack',
        'last_name': 'Horseman',
        'token': 'applicant_123',
        'type': 'applicant'
    }
};

  private token: string = null;

  onAuthChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private userAuthService: UserAuthService) {
  }

  checkIfLoggedIn() {
    return (this.isLoggedIn = this.isValidToken(this.token));
  }

  getToken() {
    return this.token || window.localStorage.getItem('token') || null;
  }

  parseToken(token: string) {
    return decode(token) || this.mockedData;
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

  getUserType(): UserDictionaryInterface {
    const userData = this.parseToken(this.getToken());
    let userType;
    if (userData.user.type === 'applicant') {
      userType = Applicant;
    } else if (userData.user.type === 'exempler') {
      userType = Exempler;
    } else if (userData.user.type === 'hiring-manager') {
      userType = HiringManager;
    }
    return Object.assign({}, userData, userType);
  }

  saveTokenToCache(accessToken: string) {
    this.token = accessToken || null;
    window.localStorage.setItem('token', this.token);
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
