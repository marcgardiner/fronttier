import { Component, OnInit } from '@angular/core';
import { SegmentService } from '../../segments/segments.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
