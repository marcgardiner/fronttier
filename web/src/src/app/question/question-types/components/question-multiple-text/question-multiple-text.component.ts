import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface MultipleTextAnswer {
  answer: string;
  label: string;
}
export class MultipleTextField extends Question {
  description?: string;
  answers: MultipleTextAnswer[];
  options: Object[];
  component = QuestionMultipleTextComponent;

  constructor(options: {} = {}) {
    super(options);
    this.answers = options['answers'] || [];
    this.description = options['description'] || '';
    this.options = options['options'] || [];
  }

}

@Component({
  selector: 'app-question-multiple-text',
  templateUrl: './question-multiple-text.component.html',
  styleUrls: ['./question-multiple-text.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionMultipleTextComponent extends QuestionBaseComponent<MultipleTextField> implements OnInit {

  QuestionForm: FormGroup = new FormGroup({
    options: new FormArray([], (c: AbstractControl) => {
      console.log(c);
      return null;
      // const selectedValues = c.value.filter(item => !(item === ''));
      // if (selectedValues.length < 3) {
      //   return { 'minCheck': false };
      // }
      // return null;
    })
  });
  answers;

  ngOnInit() {
  this.answers = this.question.answers ? this.question.answers : '';
    const formArr = <FormArray>this.QuestionForm.get('options');
    this.question.options.forEach((key: any, i) => {
      formArr.push(new FormGroup({
        fields: new FormArray([])
      }));
      const fieledArr = <FormArray>this.QuestionForm.get(['options', i]).get('fields');
      key.fields.forEach((field, j) => {
        const fieldValue  = this.answers[i] ? this.answers[i].fields[j].value : '';
        fieledArr.push(new FormGroup({
          label: new FormControl(field.label),
          value: new FormControl(fieldValue, Validators.required)
        }));
      });
    });
    this.QuestionForm.get('options').valueChanges
      .subscribe(value => {
        this.question.answers = value;
      });
  }

}
