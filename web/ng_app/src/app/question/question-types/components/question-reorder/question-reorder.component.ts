import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { DragulaService } from 'ng-dragula/ng-dragula';
import { FormGroup } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface ReOrderAnswer {
  answer: string;
  index: number;
}
export class ReOrder extends Question {
  description?: string;
  options: Object[];
  answers: ReOrderAnswer[];
  answerFlag: Boolean;

  component = QuestionReOrderComponent;

  constructor(options: {} = {}) {
    super(options);
    this.description = options['description'] || '';
    this.options = options['options'] || [];
    this.answers = options['answers'] || '';
    this.answerFlag = options['answerFlag'] || false;
  }
}

@Component({
  selector: 'app-question-reorder',
  templateUrl: './question-reorder.component.html',
  styleUrls: ['./question-reorder.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionReOrderComponent extends QuestionBaseComponent<ReOrder> implements OnInit {

  hightlightStatus: Array<boolean> = [];
  componentIndex: number;
  QuestionForm: FormGroup = new FormGroup({});

  constructor(private dragula: DragulaService) {
    super();
  }

  ngOnInit() {
    if (!this.question.answerFlag) {
      this.question.answerFlag = true;
      this.question.answers = [];
      this.question.options.forEach((element: any, index) => {
        element.index = index;
        this.question.answers.push(element);
      });
    }

    this.question.options.forEach(() => {
      this.hightlightStatus.push(false);
    });
    this.dragula
      .dropModel
      .subscribe((value) => {
        this.hightlightStatus[this.componentIndex] = false;
        this.question.answers.map((element: any, index) => {
          element.index = this.question.options.indexOf(element);
        });
      });

    // If user clicked to drag a element but canceled without dragging so we have to remove the drag class
    this.dragula
      .cancel
      .subscribe((value) => {
        this.hightlightStatus[this.componentIndex] = false;
      });
  }
  draggedItem(i) {
    this.componentIndex = i;
    this.hightlightStatus[i] = true;
  }

}
