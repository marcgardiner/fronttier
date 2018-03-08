import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantsComponent } from './add-applicants.component';
import { AngularDependenciesModule } from '../../shared/angular-dependencies.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AddApplicantsComponent', () => {
  let component: AddApplicantsComponent;
  let fixture: ComponentFixture<AddApplicantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularDependenciesModule,
        NgbModule.forRoot()
      ],
      declarations: [ AddApplicantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
