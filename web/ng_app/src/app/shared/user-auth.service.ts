import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserAuthService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.serverUri;

  register(data: Object) {
    if (!data['email']) { throw new Error('Property `email` is required.'); }
    if (!data['name']) { throw new Error('Property `name` is required.'); }
    if (!data['password']) { throw new Error('Property `password` is required.'); }

    return this.http.post(
      '/auth/register',
      data
    );
  }

  login(data): any {
    // console.log(data);
    // if (data && !data['email']) { throw new Error('Property `email` is required.'); }
    // if (data && !data['password']) { throw new Error('Property `password` is required.'); }

    const token = data.token;
    delete data.token;
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(
      this.baseUrl + '/auth/login/' + token,
       data, options);
  }

  getUser(token: string): any {
    console.log(token);
    if (!token) { throw new Error('Token is required.'); }

    return this.http.get(
      this.baseUrl + '/auth/login/' + token);
  }

}
