import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbPopoverConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/auth.service';
import { HiringDashboard } from './dashboard-dictionary';
import { RecipientsService } from '../shared/recipients.service';
import { SurveyService } from '../../shared/survey.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';
import { NgbSlideEventDirection } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  public progress = 25;
  @ViewChild('carousel') carousel: NgbCarousel;

  active = true;

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
    private authService: AuthService,
    public recipientService: RecipientsService,
    private surveyService: SurveyService,
    private router: Router) {
    popoverConfig.container = 'section#dashboard';
  }

  title: string;
  content: string;
  dashboardData;

  ngOnInit() {
    this.dashboardData = HiringDashboard;
    this.title = this.dashboardData.signal.heading;
    this.content = this.dashboardData.signal.content;
    this.recipientService.welcomeTourReset = this.authService.userData['last_login'] ? true : false;
    if (this.recipientService.welcomeTourReset) {
      this.recipientService.currentSlide = -1;
    }
  }

  ngAfterViewInit() {
    this.carousel.slide
      .takeWhile(() => this.active)
      .subscribe((slide) => {
        this.recipientService.currentSlide = parseInt(slide.current, 0);
        if (this.recipientService.currentSlide === 0 && slide.direction === NgbSlideEventDirection.LEFT) {
          this.recipientService.welcomeTourReset = true;
          this.recipientService.currentSlide = -1;
        }
      });
  }

  sendInvitations() {
    this.recipientService.jobId = 'job_NDQGPGWStII1AKxM';
    this.router.navigate(['hiring/invite']);
  }

  ngOnDestroy() {
    this.active = false;
  }

}
