import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPreviewComponent } from './full-preview.component';

describe('FullPreviewComponent', () => {
  let component: FullPreviewComponent;
  let fixture: ComponentFixture<FullPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
