import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { RecipientsService } from './recipients.service';

@Injectable()
export class EditRecipientGuard {

    constructor(private recipientService: RecipientsService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.recipientService.usersList.length || !this.recipientService.usersType) {
            this.router.navigate(['hiring/add']);
            return false;
        }
        return true;
    }

}
