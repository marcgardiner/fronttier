import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { RouterModule } from '@angular/router';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { appRoutes } from '../admin.routing';
import { EmployeesComponent } from '../employees/employees.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminComponent } from '../admin.component';
import { HeaderComponent } from '../layout/header/header.component';
import { NewCompanyModalComponent } from '../modals/new-company-modal/new-company-modal.component';
import { HiringManagersComponent } from '../hiring-managers/hiring-managers.component';
import { NewEmployeeComponent } from '../modals/new-employee/new-employee.component';
import { NewHiringManagerModalComponent } from '../modals/new-hiring-manager-modal/new-hiring-manager-modal.component';
import { StatsComponent } from '../stats/stats.component';
import { NewJobComponent } from '../modals/new-job/new-job.component';
import { TrackResponsesComponent } from '../track-responses/track-responses.component';
import { APP_BASE_HREF } from '@angular/common';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        AngularDependenciesModule,
      ],
      declarations: [ EmployeesComponent,
        DashboardComponent,
        AdminComponent,
        HeaderComponent,
        NewCompanyModalComponent,
        HiringManagersComponent,
        NewHiringManagerModalComponent,
        NewEmployeeComponent,
        JobsComponent,
        NewJobComponent,
        StatsComponent,
        TrackResponsesComponent ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
