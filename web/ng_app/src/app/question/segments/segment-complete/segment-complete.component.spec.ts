import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentCompleteComponent } from './segment-complete.component';
import { AuthService } from '../../../shared/auth.service';
import { UserAuthService } from '../../../shared/user-auth.service';
import { AngularDependenciesModule } from '../../../shared/angular-dependencies.module';

describe('SegmentCompleteComponent', () => {
  let component: SegmentCompleteComponent;
  let fixture: ComponentFixture<SegmentCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule
      ],
      declarations: [SegmentCompleteComponent],
      providers: [
        AuthService,
        UserAuthService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
