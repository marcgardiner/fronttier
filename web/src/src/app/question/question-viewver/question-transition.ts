// tslint:disable-next-line:max-line-length
import { ViewContainerRef, trigger, transition, animate, state, style, HostBinding } from '@angular/core';

export const slideInOutAnimation = trigger('slideInOutAnimation', [
    state('*', style({ width: '100%' })),
    state('void', style({ width: '100%' })),
    transition(':enter', [  // before 2.1: transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [  // before 2.1: transition('* => void', [
        style({ transform: 'translateX(0%)' }),
        animate('0.2s ease-in', style({ transform: 'scale(0.8)' })),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
    ])
]);

