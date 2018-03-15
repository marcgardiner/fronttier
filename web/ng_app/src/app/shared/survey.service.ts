import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SurveyService {

    constructor(private http: HttpClient) { }
    baseUrl: string = environment.serverUri;


    getSurvey(): any {
        // return this.http.get(
        //   this.baseUrl + '/auth/login/' + token);
        return {
            'token': 'login_v2qxa5d1E14ZhGhf',
            'num_logins': 2,
            'last_login': '2018-03-13T07:52:34.226Z',
            'user': {
                'first_name': 'John',
                'last_name': 'Doe',
                'company': null,
                'token': 'applicant_N6tWmbVe7GCEQOMZ',
                'type': 'applicant',
                'email': 'john@frontier.com'
            },
            'survey_response': {
                'token': 'survey_resp_Nm7a9MhGcHC8lWKg'
            }
        };
    }

    getJobs() {
        // return this.http.get(
        //   this.baseUrl + '/survey/jobs/');

        return [
            {
              'token': 'job_xxx',
              'company': 'company_yyy',
              'type': 'intern',
              'level': 'mid',
              'title': 'Lawyer',
              'description': 'Corporate MNA',
              'state': 'open'
            }
          ];
    }

}
