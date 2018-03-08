import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface DragDropAnswer {
  title: string;
  rank: number;
}
export class RankOrder extends Question {
  description?: string;
  options: Object[];
  answers: DragDropAnswer[];
  answersFlag: Boolean;

  component = QuestionRankorderComponent;

  constructor(options: {} = {}) {
    super(options);
    this.description = options['description'] || '';
    this.options = options['options'] || [];
    this.answers = options['answers'] || '';
    this.answersFlag = options['answersFlag'] || false;
  }
}

@Component({
  selector: 'app-question-rankorder',
  templateUrl: './question-rankorder.component.html',
  styleUrls: ['./question-rankorder.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionRankorderComponent extends QuestionBaseComponent<RankOrder> implements OnInit {

  QuestionForm: FormGroup = new FormGroup({
    options: new FormArray([]),
  });
  simpleValue;

  ngOnInit() {
    if (!this.question.answersFlag) {
      this.question.answersFlag = true;
      this.question.answers = [];
    }
    const formArr = <FormArray>this.QuestionForm.get('options');
    this.question.options.forEach((key, i) => {
      formArr.push(new FormControl(this.question.answers[i], [Validators.required]));
    });
    this.QuestionForm.get('options').valueChanges
      .subscribe(value => {
        this.question.answers = value;
      });
  }

  saveValue(option, index) {
    this.QuestionForm.get(['options', index]).setValue(option);
  }

}
