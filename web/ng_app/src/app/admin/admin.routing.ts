import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewCompanyModalComponent } from './modals/new-company-modal/new-company-modal.component';
import { NewHiringManagerModalComponent } from './modals/new-hiring-manager-modal/new-hiring-manager-modal.component';
import { NewEmployeeComponent } from './modals/new-employee/new-employee.component';
import { NewJobComponent } from './modals/new-job/new-job.component';
import { HiringManagersComponent } from './hiring-managers/hiring-managers.component';
import { EmployeesComponent } from './employees/employees.component';
import { JobsComponent } from './jobs/jobs.component';
import { StatsComponent } from './stats/stats.component';
import { TrackResponsesComponent } from './track-responses/track-responses.component';
import { DashboardResolver } from './dashboard/dashboard.resolver';
import { HiringManagersResolver } from './hiring-managers/hiring-managers.resolver';
import { EmployeesResolver } from './employees/employees.resolver';
import { JobsResolver } from './jobs/jobs.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, resolve: { DashboardResolver: DashboardResolver } },
      { path: 'new-company', component: NewCompanyModalComponent },
      { path: 'hiring-manager', component: HiringManagersComponent, resolve: { HiringManagersResolver: HiringManagersResolver } },
      { path: 'new-hiring-manager', component: NewHiringManagerModalComponent },
      { path: 'employees', component: EmployeesComponent, resolve: { EmployeesResolver: EmployeesResolver } },
      { path: 'new-employee', component: NewEmployeeComponent },
      { path: 'jobs', component: JobsComponent, resolve: {JobsResolver: JobsResolver} },
      { path: 'new-job', component: NewJobComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'track-responses', component: TrackResponsesComponent }
    ]
  }
];
