import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hiring-managers',
  templateUrl: './hiring-managers.component.html',
  styleUrls: ['./hiring-managers.component.sass']
})
export class HiringManagersComponent implements OnInit {

  managers = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.managers = this.activatedRoute.snapshot.data.HiringManagersResolver;
  }

}
