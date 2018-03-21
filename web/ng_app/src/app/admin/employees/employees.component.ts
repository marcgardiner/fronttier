import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {

  employees = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.employees = this.activatedRoute.snapshot.data.EmployeesResolver;
  }

}
