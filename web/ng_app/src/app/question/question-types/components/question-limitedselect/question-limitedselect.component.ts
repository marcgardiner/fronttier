import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { FormArray, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface LimitedSelectAnswer {
  answer: string;
}
export class LimitedSelect extends Question {
  description?: string;
  options: Object[];
  answers: LimitedSelectAnswer[];

  component = QuestionLimitedselectComponent;

  constructor(options: {} = {}) {
    super(options);
    this.description = options['description'] || '';
    this.options = options['options'] || [];
    this.answers = options['answers'] || '';
  }
}

@Component({
  selector: 'app-question-limitedselect',
  templateUrl: './question-limitedselect.component.html',
  styleUrls: ['./question-limitedselect.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionLimitedselectComponent extends QuestionBaseComponent<LimitedSelect> implements OnInit {

  QuestionForm: FormGroup = new FormGroup({
    options: new FormArray([], (c: AbstractControl) => {
      const selectedValues = c.value.filter(item => !(item === ''));
      if (selectedValues.length < 3) {
        return { 'minCheck': false };
      }
      return null;
    })
  });

  ngOnInit() {
    const formArr = <FormArray>this.QuestionForm.get('options');
    this.question.options.forEach((key: any, i) => {
      let preset = '';
      if (this.question.answers[i] === key.label) {
        preset = key.label;
      }
      formArr.push(new FormControl(preset));
    });
    this.QuestionForm.get('options').valueChanges
      .subscribe(value => {
        this.question.answers = value;
      });
  }

}
