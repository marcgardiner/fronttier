import { Component, OnInit } from '@angular/core';
import { NgbPopoverConfig, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/auth.service';
import { HiringDashboard } from './dashboard-dictionary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public progress = 25;

  constructor(popoverConfig: NgbPopoverConfig,
    private authService: AuthService,
    private ngbCarousel: NgbCarouselConfig) {
    popoverConfig.container = 'section#dashboard';
  }

  title: string;
  content: string;

  ngOnInit() {
    this.title = HiringDashboard.signal.heading;
    this.content = HiringDashboard.signal.content;
  }

}
