import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserAuthService {
  constructor(private http: HttpClient) { }

  login(data): any {
    const token = data.token;
    delete data.token;
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post("/auth/login/" + token, data, options);
  }

  loginUser(data): any {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post("/auth/login", data, options);
  }

  getUser(token: string): any {
    if (!token) {
      throw new Error("Token is required.");
    }

    return this.http.get("/auth/login/" + token);
  }

  getSurveyUser(token: string): any {
    console.log(token);
    if (!token) { throw new Error('Token is required.'); }

    return this.http.get(
      '/survey/response/' + token);
  }

}
