import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  companies = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.companies = this.activatedRoute.snapshot.data.DashboardResolver;
  }

}
