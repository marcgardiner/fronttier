import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { JobService } from '../../shared/job.service';

@Injectable()
export class DashboardResolver implements Resolve<any> {
    constructor(
        private router: Router,
        private jobService: JobService) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('resolving');
        return this.jobService.getJobs();
    }
}
