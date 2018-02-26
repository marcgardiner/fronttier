import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-all-recipients-modal',
  templateUrl: './all-recipients-modal.component.html',
  styleUrls: ['./all-recipients-modal.component.sass']
})
export class AllRecipientsModalComponent implements OnInit {

  usersList = ['chris@charmingbot.com', 'bhatti@charmingbot.com', 'moiz@charmingbot.com'];
  user: string;

  constructor() { }

  ngOnInit() {
  }

  removeUser(user) {
    console.log(user);
    this.usersList.splice(this.usersList.indexOf(user), 1);
  }

  addnewUser() {
    if (!this.user) {
      return;
    }
    this.usersList.push(this.user);
    this.user = '';
  }

}
