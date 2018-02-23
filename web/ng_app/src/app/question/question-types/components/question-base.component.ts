import { Component, Input, trigger, transition, animate, state, style, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-question-base',
    template: ''
})
export class QuestionBaseComponent<T> {
    @Input() question: T;
    QuestionForm: FormGroup;
    @HostBinding('style.display') display = 'block';
    @HostBinding('@slideInOutAnimation') animation = true;
}
