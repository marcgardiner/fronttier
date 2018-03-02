import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  login(data: Object = null): any {
    console.log(data);
    if (data && !data['email']) { throw new Error('Property `email` is required.'); }
    if (data && !data['password']) { throw new Error('Property `password` is required.'); }

    return this.http.post(
      this.baseUrl + '/auth/login/',
       data);
  }

}
