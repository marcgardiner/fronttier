import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserAuthService } from './user-auth.service';
import { AngularDependenciesModule } from './angular-dependencies.module';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule
      ],
      providers: [AuthService,
        UserAuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
