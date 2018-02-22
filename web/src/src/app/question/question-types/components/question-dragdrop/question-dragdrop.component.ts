import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/questions';
import { QuestionBaseComponent } from '../question-base.component';
import { DragulaService } from 'ng-dragula/ng-dragula';
import { FormGroup } from '@angular/forms';
import { slideInOutAnimation } from '../../../question-viewver/question-transition';

interface DragDropAnswer {
  title: string;
  index: number;
}
export class DragDrop extends Question {
  description?: string;
  options: Object[];
  answers: DragDropAnswer[];
  answersLimit: number;

  component = QuestionDragdropComponent;

  constructor(options: {} = {}) {
    super(options);
    this.description = options['description'] || '';
    this.options = options['options'] || [];
    this.answers = options['answers'] || [];
    this.answersLimit = options['answersLimit'] || '';
  }
}

@Component({
  selector: 'app-question-dragdrop',
  templateUrl: './question-dragdrop.component.html',
  styleUrls: ['./question-dragdrop.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class QuestionDragdropComponent extends QuestionBaseComponent<DragDrop> implements OnInit {

  QuestionForm: FormGroup = new FormGroup({});
  constructor(private dragula: DragulaService) {
    super();
    const bag: any = this.dragula.find('first-bag');
    if (bag !== undefined) { this.dragula.destroy('first-bag'); }
  }

  ngOnInit() {
    this.dragula
      .setOptions('first-bag', {
        moves: (el, container, handle) => {
          if (container.classList.contains('main-container') && this.question.answers.length === this.question.answersLimit) {
            return false;
          }
          return true;
        },
        copy: function (el, source) {
          // To copy only elements in left container, the right container can still be sorted
          return source.id === 'left';
        },
        copySortSource: false,
        accepts: function (el, target, source, sibling) {
          // To avoid draggin from right to left container
          return target.id !== 'left';
        }
      });
    this.dragula
      .drop
      .subscribe((el, container) => {
        let element;
        if (el[3].id === 'right') {
          return;
        }
        this.question.answers.forEach((key: any, i) => {
          element = key;
          if (el[1].innerText.includes(key.heading && key.description)) {
            this.question.answers.splice(i, 1);
          }
        });
      });
  }

}
