import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AngularDependenciesModule } from '../shared/angular-dependencies.module';
import { appRoutes } from './admin.routing';
import { HeaderComponent } from './layout/header/header.component';
import { NewCompanyModalComponent } from './modals/new-company-modal/new-company-modal.component';
import { HiringManagersComponent } from './hiring-managers/hiring-managers.component';
import { NewHiringManagerModalComponent } from './modals/new-hiring-manager-modal/new-hiring-manager-modal.component';
import { EmployeesComponent } from './employees/employees.component';
import { NewEmployeeComponent } from './modals/new-employee/new-employee.component';
import { JobsComponent } from './jobs/jobs.component';
import { NewJobComponent } from './modals/new-job/new-job.component';
import { StatsComponent } from './stats/stats.component';
import { TrackResponsesComponent } from './track-responses/track-responses.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    AngularDependenciesModule,
  ],
  entryComponents: [
    NewCompanyModalComponent
  ],
  declarations: [DashboardComponent,
    AdminComponent,
    HeaderComponent,
    NewCompanyModalComponent,
    HiringManagersComponent,
    NewHiringManagerModalComponent,
    EmployeesComponent,
    NewEmployeeComponent,
    JobsComponent,
    NewJobComponent,
    StatsComponent,
    TrackResponsesComponent]
})
export class AdminModule { }
