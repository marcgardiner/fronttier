import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class InvitationsService {

    constructor(private http: HttpClient) { }
    baseUrl: string = environment.serverUri;


    sendInvitations(data): any {
        if (!data['type']) { throw new Error('Property `type` is required.'); }
        if (!data['emails']) { throw new Error('Property `emails` is required.'); }
        if (!data['job']) { throw new Error('Property `job` is required.'); }

        const options = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          };
        return this.http.post(
            this.baseUrl + '/survey/invite',
            data,
            options
        );
    }

}
