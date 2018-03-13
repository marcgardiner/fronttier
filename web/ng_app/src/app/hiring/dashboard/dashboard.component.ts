import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbPopoverConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/auth.service';
import { HiringDashboard } from './dashboard-dictionary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public progress = 25;
  @ViewChild('carousel') carousel: NgbCarousel;

  data = [{
    title: 'Sales Manager - Hiltown Midtown',
    examplars: 0,
    applicants: '5/12',
    matches: 0,
    invite: true,
    view: true
  }, {
    title: 'Sales & Marketing Analyst - Hiltown Midtown',
    examplars: 0,
    applicants: '5/12',
    matches: 0,
    invite: false,
    view: true
  }];

  constructor(popoverConfig: NgbPopoverConfig,
    private authService: AuthService) {
    popoverConfig.container = 'section#dashboard';
  }

  title: string;
  content: string;
  currentSlide = 'ngb-slide-0';
  sliderComplete = false;
  dashboardData;

  ngOnInit() {
    this.dashboardData = HiringDashboard;
    this.title = this.dashboardData.signal.heading;
    this.content = this.dashboardData.signal.content;
  }

  ngAfterViewInit() {
    this.carousel.slide.subscribe((slide) => {
      this.currentSlide = slide.current;
      if (this.currentSlide === 'ngb-slide-0' && slide.direction === 'left') {
        this.sliderComplete = true;
        this.currentSlide = '';
      }
    });
  }

}
