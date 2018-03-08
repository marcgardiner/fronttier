import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface MultiSelectAnswer {
  answer: string;
}
export class MultiSelect extends Question {
  description?: string;
  options: Object[];
  answers: MultiSelectAnswer[];
  answersFlag: Boolean;

  component = QuestionMultiselectComponent;

  constructor(options: {} = {}) {
      super(options);
      this.description = options['description'] || '';
      this.options = options['options'] || [];
      this.answers = options['answers'] || '';
      this.answersFlag = options['answersFlag'] || false;
  }
}

@Component({
  selector: 'app-question-multiselect',
  templateUrl: './question-multiselect.component.html',
  styleUrls: ['./question-multiselect.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionMultiselectComponent extends QuestionBaseComponent<MultiSelect> implements OnInit {

  @HostBinding('class')
  classes = 'main-content question-content text-center';

  QuestionForm: FormGroup = new FormGroup({
    options: new FormArray([], (c: AbstractControl) => {
      if (!c.value.some(val => val)) {
       return { 'minCheck': false };
      }
      return null;
    })
  });


  ngOnInit() {
    if (!this.question.answersFlag) {
      this.question.answersFlag = true;
      this.question.answers = [];
    }
    const formArr = <FormArray>this.QuestionForm.get('options');
    this.question.options.forEach((key, i) => {
      formArr.push(new FormControl(this.question.answers[i]));
    });
    this.QuestionForm.get('options').valueChanges
    .subscribe(value => {
      this.question.answers = value;
    });
  }

  nextChar(alphabet) {
    return String.fromCharCode('a'.charCodeAt(0) + alphabet);
  }

}
