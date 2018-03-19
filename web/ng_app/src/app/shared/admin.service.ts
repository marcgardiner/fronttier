import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    getCompanies(): any {
        // return this.http.get("/admin/companies");
        return [{
            id: 'A1b345',
            name: 'Bank of America',
            contact: 'John Doe',
            email: 'omarkiy@bofa.com',
            address: '42nd street 6th ave',
            phone: 7706537399,
            logo: 'assets/img/admin/logo-1.png',
            hiring_manager: 3
        }, {
            id: 'as756g',
            name: 'Morgan Stanley',
            contact: 'Jessica Mez',
            email: 'JM@morganstan.com',
            address: '123 5th ave',
            phone: null,
            logo: 'assets/img/admin/logo-2.png',
            hiring_manager: 3
        }];
    }

    getHiringManagers(): any {
        // return this.http.get("/admin/managers");
        return [{
            id: 'HM1230',
            name: 'Bank of America',
            hm_name: 'Omar Kiy',
            email: 'omarkiy@bofa.com',
            address: '42nd street 6th ave',
            phone: 7706537399,
            open_jobs: 1,
            status: 'Invite sent',
            logo: 'assets/img/admin/t-1.png'
        }, {
            id: 'HM1231',
            name: 'Bank of America',
            hm_name: 'Elizabeth',
            email: 'Eliz@bofa.com',
            address: '42nd street 6th ave',
            phone: 7706537399,
            open_jobs: 1,
            status: 'Active',
            logo: 'assets/img/admin/t-2.png'
        }, {
            id: 'HM1232',
            name: 'Bank of America',
            hm_name: 'Yi',
            email: 'Yi@bofa.com',
            address: '42nd street 6th ave',
            phone: 7706537399,
            open_jobs: 1,
            status: 'Active',
            logo: 'assets/img/admin/t-2.png'
        }];
    }

    getHiringEmployees(): any {
        // return this.http.get("/admin/employees");
        return [{
            id: 'bo546v',
            title: 'Financial Analyst',
            type: 'full time',
            level: 'Entry Level',
            company: 'Bank Of America',
            hm_manager: 'Omar Kiyani',
            location: 'NY,Ny',
            status: 'Open',
        }];
    }

    getJobs(): any {
        // return this.http.get("/admin/employees");
        return [{
            id: 'bo546v',
            position: 'Financial Analyst',
            company: 'Bank Of America',
            hm_manager: 'Omar Kiyani',
            status: 'Open',
        }, {
            id: 'bo546v',
            position: 'Financial Analyst',
            company: 'Bank Of America',
            hm_manager: 'YI',
            status: 'Open',
        }, {
            id: 'bo546v',
            position: 'Financial Analyst',
            company: 'Bank Of America',
            hm_manager: 'Elizabeth',
            status: 'Closed',
        }];
    }

}
