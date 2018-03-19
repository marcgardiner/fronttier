import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.sass']
})
export class JobsComponent implements OnInit {

  jobs = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.jobs = this.activatedRoute.snapshot.data.JobsResolver;
    console.log(this.jobs);
  }

}
