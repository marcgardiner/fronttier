import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class JobService {
  constructor(private http: HttpClient) {}

  getJobs(): any {
    return this.http.get("/survey/jobs");
  }
}
