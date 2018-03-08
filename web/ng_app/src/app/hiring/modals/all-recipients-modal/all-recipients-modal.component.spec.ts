import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecipientsModalComponent } from './all-recipients-modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularDependenciesModule } from '../../../shared/angular-dependencies.module';

describe('AllRecipientsModalComponent', () => {
  let component: AllRecipientsModalComponent;
  let fixture: ComponentFixture<AllRecipientsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        AngularDependenciesModule
      ],
      declarations: [ AllRecipientsModalComponent ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRecipientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
