import { Component, Input, trigger, transition, animate, state, style, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-question-base',
    template: '',
    // animations: [
    //     trigger('slideInOutAnimation', [
    //       state('*', style({ width: '100%' })),
    //       state('void', style({ width: '100%' })),
    //       transition(':enter', [  // before 2.1: transition('void => *', [
    //         style({ transform: 'translateX(100%)' }),
    //         animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    //       ]),
    //       transition(':leave', [  // before 2.1: transition('* => void', [
    //         style({ transform: 'translateX(0%)' }),
    //         animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
    //       ])
    //     ])
    //   ],
})
export class QuestionBaseComponent<T> {
    @Input() question: T;
    QuestionForm: FormGroup;
    @HostBinding('style.display') display = 'block';
    @HostBinding('@slideInOutAnimation') animation = true;
}
