import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class SurveyService {
  constructor(private http: HttpClient) {}

  getSurvey(): any {
    return {
      token: "login_v2qxa5d1E14ZhGhf",
      num_logins: 2,
      last_login: "2018-03-13T07:52:34.226Z",
      user: {
        first_name: "John",
        last_name: "Doe",
        company: null,
        token: "applicant_N6tWmbVe7GCEQOMZ",
        type: "applicant",
        email: "john@frontier.com"
      },
      survey_response: {
        token: "survey_resp_Nm7a9MhGcHC8lWKg"
      }
    };
  }
}
