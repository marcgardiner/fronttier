import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class RecipientsService {

    usersList: string[] = [];
    usersType: string;
    user: string;
    welcomeTourReset: Boolean;
    currentSlide: string;

    constructor() {
        this.welcomeTourReset = false;
        this.currentSlide = 'ngb-slide-0';
    }


}
