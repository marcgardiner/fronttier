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

export const appRoutes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'new-company', component: NewCompanyModalComponent },
        { path: 'hiring-manager', component: HiringManagersComponent },
        { path: 'new-hiring-manager', component: NewHiringManagerModalComponent },
        { path: 'employees', component: EmployeesComponent },
        { path: 'new-employee', component: NewEmployeeComponent },
        { path: 'jobs', component: JobsComponent },
        { path: 'new-job', component: NewJobComponent }
      ]
    }
  ];
