import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserAuthService } from './user-auth.service';
import { AngularDependenciesModule } from './angular-dependencies.module';
import { Router, RouterModule } from '@angular/router';
import { appRoutes } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        RouterModule.forRoot(appRoutes)
      ],
      providers: [AuthService,
        UserAuthService,
        { provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
