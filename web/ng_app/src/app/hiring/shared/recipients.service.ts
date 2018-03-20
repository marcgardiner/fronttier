import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class RecipientsService {

    usersList: string[] = [];
    usersType: string;
    user: string;
    welcomeTourReset: Boolean;
    currentSlide: number;
    jobId: string;
    errorFlag = false;
    welcomeTourNewUser = false;
    welcomeBannerFlag = false;

    constructor() {
        this.welcomeTourReset = false;
        this.currentSlide = 0;
    }


}
