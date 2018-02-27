import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecipientsModalComponent } from './all-recipients-modal.component';

describe('AllRecipientsModalComponent', () => {
  let component: AllRecipientsModalComponent;
  let fixture: ComponentFixture<AllRecipientsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRecipientsModalComponent ]
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
