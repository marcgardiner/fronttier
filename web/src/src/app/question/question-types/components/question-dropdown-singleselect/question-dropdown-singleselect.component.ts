import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface DropdownSingleSelectAnswer {
  answer: string;
}
export class DropDownSingleSelect extends Question {
  description?: string;
  options: Object[];
  answers: DropdownSingleSelectAnswer;

  component = QuestionDropdownSingleselectComponent;

  constructor(options: {} = {}) {
    super(options);
    this.description = options['description'] || '';
    this.options = options['options'] || [];
    this.answers = options['answers'] || '';
  }
}

@Component({
  selector: 'app-question-dropdown-singleselect',
  templateUrl: './question-dropdown-singleselect.component.html',
  styleUrls: ['./question-dropdown-singleselect.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionDropdownSingleselectComponent extends QuestionBaseComponent<DropDownSingleSelect> implements OnInit {


  QuestionForm: FormGroup = new FormGroup({
    option: new FormControl('Adobe Photoshop', [Validators.required]),
  });

  ngOnInit() {
    this.QuestionForm.get('option').setValue(this.question.answers);
    this.QuestionForm.get('option').valueChanges
      .subscribe(value => {
        this.question.answers = value;
      });
  }

  saveValue(option) {
    this.QuestionForm.get('option').setValue(option);
  }

}
