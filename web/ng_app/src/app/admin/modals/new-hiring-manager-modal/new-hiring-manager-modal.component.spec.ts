import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHiringManagerModalComponent } from './new-hiring-manager-modal.component';

describe('NewHiringManagerModalComponent', () => {
  let component: NewHiringManagerModalComponent;
  let fixture: ComponentFixture<NewHiringManagerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHiringManagerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHiringManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
