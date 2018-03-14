import { TestBed, inject } from '@angular/core/testing';

import { UserAuthService } from './user-auth.service';
import { AngularDependenciesModule } from './angular-dependencies.module';

describe('UserAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule
      ],
      providers: [UserAuthService]
    });
  });

  it('should be created', inject([UserAuthService], (service: UserAuthService) => {
    expect(service).toBeTruthy();
  }));
});
