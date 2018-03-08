import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentCompleteComponent } from './segment-complete.component';

describe('SegmentCompleteComponent', () => {
  let component: SegmentCompleteComponent;
  let fixture: ComponentFixture<SegmentCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentCompleteComponent ]
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
