import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';

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
  userData;
  surveyComplete = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // following is ther flag to check if survey is completed or segement is completed
    this.surveyComplete = true;
    this.completedSegments = this.segments[(this.segment - 1) - 1];
    this.userData = this.authService.getUserType();
    console.log(this.userData);
  }

}
