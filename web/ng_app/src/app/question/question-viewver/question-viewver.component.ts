// tslint:disable-next-line:max-line-length
import { Component, OnInit, ViewChild, ComponentFactoryResolver, ViewContainerRef, trigger, transition, animate, state, style, HostBinding } from '@angular/core';
import { QuestionFieldService } from '../../shared/question-field.service';
import { Question } from '../question-types/models/questions';
import { QuestionMultiselectComponent } from '../question-types/components/question-multiselect/question-multiselect.component';
import { QuestionBaseComponent } from '../question-types/components/question-base.component';
import { FormGroup } from '@angular/forms';
import { ThinkingStateService } from '../../shared/thinking-state.service';
import { SegmentService } from '../segments/segments.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-question-viewver',
  templateUrl: './question-viewver.component.html',
  styleUrls: ['./question-viewver.component.sass']
})
export class QuestionViewverComponent implements OnInit {
  @ViewChild('questionComponent', {
    read: ViewContainerRef
  }) containerRef: ViewContainerRef;

  // @HostBinding('class')
  // classes = 'main-content question-content text-center';


  questionData;
  questionIndex = 0;
  formGroup: FormGroup;
  flag = false;

  constructor(
    private questionFieldService: QuestionFieldService,
    private factoryResolver: ComponentFactoryResolver,
    private thinkingState: ThinkingStateService,
    private segmentService: SegmentService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    const index = parseInt(window.localStorage.getItem('index'), 0) || 0;
    this.getQuestionare(index);
  }

  getQuestionare(index) {
    if (index < 0) {
      return;
    } else if (this.questionFieldService.questionsArr.length === index) {
      this.router.navigate(['question/segment-complete']);
      return;
    }
    this.questionIndex = index;
    this.questionData = this.questionFieldService.getQuestion(this.questionIndex);
    this.renderComponent(this.questionData);
  }

  renderComponent(question: Question) {
    this.containerRef.detach();
    if (!this.flag) {
      this.loadComponent(question);
      this.flag = true;
      return;
    }
    setTimeout(() => {
      this.loadComponent(question);
    }, 700);
  }

  loadComponent(question) {
    const factory = this.factoryResolver.resolveComponentFactory(question.component);
    const component = factory.create(this.containerRef.parentInjector);
    const componentInstance = (<QuestionBaseComponent<Question>>component.instance);
    componentInstance.question = question;
    // if (componentInstance.question['answers']) {
    //   this.getQuestionare(this.questionIndex + 1);
    //   return;
    // }
    this.formGroup = componentInstance.QuestionForm;
    this.containerRef.insert(component.hostView);
  }

}
