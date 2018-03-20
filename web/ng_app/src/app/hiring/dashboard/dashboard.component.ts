import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbPopoverConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../shared/auth.service';
import { HiringDashboard } from './dashboard-dictionary';
import { RecipientsService } from '../shared/recipients.service';
import { JobService } from '../../shared/job.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  jobData;

  data = [{
    title: 'Sales Manager - Hiltown Midtown',
    description: '',
    level: '',
    status: 'open',
    surveys: {
      exemplar: {
        total: 10,
        pending: 3
      },
      applicant: {
        total: 10,
        pending: 3
      },
    },
    token: 'advadv',
    type: true,
  }, {
    title: 'Sales Manager - Hiltown Midtown',
    description: '',
    level: '',
    status: 'open',
    surveys: {
      exemplar: {
        total: 10,
        pending: 3
      },
      applicant: {
        total: 10,
        pending: 3
      },
    },
    token: 'advadv',
    type: true,
  }, {
    title: 'Sales Manager - Hiltown Midtown',
    description: '',
    level: '',
    status: 'open',
    surveys: {
      exemplar: {
        total: 10,
        pending: 3
      },
      applicant: {
        total: 10,
        pending: 3
      },
    },
    token: 'advadv',
    type: true,
  }];

  constructor(popoverConfig: NgbPopoverConfig,
    private authService: AuthService,
    public recipientService: RecipientsService,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    popoverConfig.container = 'section#dashboard';
  }

  title: string;
  content: string;
  dashboardData;

  ngOnInit() {
    const resolvedData = this.activatedRoute.snapshot.data.DashboardResolver;
    this.jobData = resolvedData.jobs[0];
    this.dashboardData = HiringDashboard;
    this.title = this.dashboardData.signal.heading;
    this.content = this.dashboardData.signal.content;
    if (!this.recipientService.welcomeTourNewUser) {
      this.recipientService.welcomeTourReset = this.authService.userData['last_login'] ? true : false;
      this.recipientService.currentSlide = 0;
    }
    if (this.recipientService.welcomeTourReset) {
      this.recipientService.currentSlide = -1;
    }
    console.log(this.jobData);
  }

  ngAfterViewInit() {
    this.carousel.slide
      .takeWhile(() => this.active)
      .subscribe((slide) => {
        this.recipientService.currentSlide = parseInt(slide.current, 0);
        if (this.recipientService.currentSlide === 0 && slide.direction === NgbSlideEventDirection.LEFT) {
          this.recipientService.welcomeTourReset = true;
          this.recipientService.welcomeTourNewUser = true;
          this.recipientService.currentSlide = -1;
        }
      });
  }

  sendInvitations(token) {
    this.recipientService.jobId = token;
    this.router.navigate(['hiring/invite']);
  }

  ngOnDestroy() {
    this.active = false;
    this.recipientService.currentSlide = 0;
  }

}
