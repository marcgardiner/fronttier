import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-segment-complete',
  templateUrl: './segment-complete.component.html',
  styleUrls: ['./segment-complete.component.sass']
})
export class SegmentCompleteComponent implements OnInit {

  completedSegments: string;
  segment = 3;
  questions = 31;
  time = 40;
  segments = ['One', 'Two', 'Three'];
  constructor() { }

  ngOnInit() {
    this.completedSegments = this.segments[(this.segment - 1) - 1];
  }

}
