import { Component, OnInit, HostBinding } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface TextAnswer {
  answer: string;
}
export class TextField extends Question {
  description?: string;
  answers: TextAnswer;
  component = QuestionTextComponent;

  constructor(options: {} = {}) {
    super(options);
    this.answers = options['answers'] || '';
    this.description = options['description'] || '';
  }

}

@Component({
  selector: 'app-question-text',
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionTextComponent extends QuestionBaseComponent<TextField> implements OnInit {

  // @HostBinding('class')
  // classes = 'main-content question-content text-center';

  QuestionForm: FormGroup = new FormGroup({
    answer: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  ngOnInit() {
    this.QuestionForm.get('answer').setValue(this.question.answers);
    this.QuestionForm.get('answer').valueChanges
      .subscribe(value => {
        this.question.answers = value;
      });
  }

  setFormValue(data) {
    this.QuestionForm.controls['answer'].setValue(data);
  }

}
