import { Component, OnInit } from '@angular/core';
import { ThinkingStateService } from '../shared/thinking-state.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {

  constructor(private thinkingState: ThinkingStateService) { }

  ngOnInit() {
    this.thinkingState.showThinkingState = false;
  }

}
