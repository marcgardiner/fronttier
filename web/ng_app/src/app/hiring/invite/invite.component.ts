import { Component, OnInit } from '@angular/core';
import { RecipientsService } from '../shared/recipients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.sass']
})
export class InviteComponent implements OnInit {

  constructor(private recipientSerivce: RecipientsService,
  private router: Router) { }

  ngOnInit() {
  }

  addInvitations(type: string) {
    this.recipientSerivce.usersType = type;
    this.router.navigate(['hiring/add']);
  }

}
