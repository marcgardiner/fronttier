import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from '../../shared/admin.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {
    constructor(
        private router: Router,
        private adminService: AdminService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.adminService.getCompanies();
    }
}
