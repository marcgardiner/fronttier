import { Component, OnInit } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public progress: number = 25;

  constructor(popoverConfig: NgbPopoverConfig) {
    popoverConfig.container = 'section#dashboard';
  }

  ngOnInit() {
  }

}
