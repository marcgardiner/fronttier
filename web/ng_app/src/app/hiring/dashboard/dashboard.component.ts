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

  constructor(popoverConfig: NgbPopoverConfig,
    private authService: AuthService) {
    popoverConfig.container = 'section#dashboard';
  }

  title: string;
  content: string;
  currentSlide = 'ngb-slide-0';
  dashboardData;

  ngOnInit() {
    this.carousel.interval = 0;
    this.dashboardData = HiringDashboard;
    this.title = this.dashboardData.signal.heading;
    this.content = this.dashboardData.signal.content;
  }

  ngAfterViewInit() {
    this.carousel.slide.subscribe((slide) => {
      this.currentSlide = slide.current;
    });
  }

}
