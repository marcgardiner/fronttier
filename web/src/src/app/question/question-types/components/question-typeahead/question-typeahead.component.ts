import { Component, OnInit, trigger, transition, animate, state, style, HostBinding } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';


interface TypeAheadAnswer {
  answer: string;
}
export class TypeAhead extends Question {
  description?: string;
  answers: TypeAheadAnswer[];
  options: Object[];
  component = QuestionTypeaheadComponent;

  constructor(options: {} = {}) {
    super(options);
    this.answers = options['answers'] || '';
    this.options = options['options'] || [];
    this.description = options['description'] || '';
  }

}

@Component({
  selector: 'app-question-typeahead',
  templateUrl: './question-typeahead.component.html',
  styleUrls: ['./question-typeahead.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionTypeaheadComponent extends QuestionBaseComponent<TypeAhead> implements OnInit {

  QuestionForm: FormGroup = new FormGroup({
    options: new FormArray([])
  });

  ngOnInit() {
    const formArr = <FormArray>this.QuestionForm.get('options');
    this.question.options.forEach((key, i) => {
      formArr.push(new FormControl(this.question.answers[i], [Validators.required]));
    });
    this.QuestionForm.get('options').valueChanges
      .subscribe(value => {
        console.log(value);
        this.question.answers = value;
      });
  }

  setSelectedValue(value, index) {
    console.log(value, index);
    this.QuestionForm.get(['options', index]).setValue(value);
  }

}
