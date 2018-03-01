import { Component, OnInit, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { validateEmail } from '../../shared/common/email-validator';

@Component({
  selector: 'app-all-recipients-modal',
  templateUrl: './all-recipients-modal.component.html',
  styleUrls: ['./all-recipients-modal.component.sass']
})
export class AllRecipientsModalComponent implements OnInit {

  usersList: string[];
  usersType: string;
  user: string;
  editUserIndex: number = null;
  hoveredIndex;
  editUser: any = {};
  showUserLabel = false;
  showEditUserLabel = false;
  usersData = [];


  @ViewChild('test') test;
  constructor(private activeModal: NgbActiveModal) {
  }
  @Output() updatedRecipients = new EventEmitter();

  ngOnInit() {
    this.usersList.forEach((item, i) => {
      const validEmail = validateEmail(item);
      if (validEmail) {
        this.usersData.push({
          value: item,
          valid: validateEmail(item)
        });
      } else {
        this.usersData.unshift({
          value: item,
          valid: validateEmail(item)
        });
      }
    });
  }

  removeUser(user) {
    this.usersData.splice(this.usersData.indexOf(user), 1);
  }

  addnewUser() {
    if (!this.user) {
      return;
    }
    this.usersList.push(this.user);
    this.user = '';
  }

  getEditUserIndex(user, i) {
    this.editUser = {
      index: i,
      value: user.value
    };
    setTimeout(() => {
      this.test.nativeElement.focus();
    }, 10);
  }

  saveEditUser() {
    this.usersData[this.editUser.index].value = this.editUser.value;
    this.usersData[this.editUser.index].valid = validateEmail(this.editUser.value);
    this.editUser.index = null;
    this.updatedRecipients.emit(this.getRecipientsArr());
  }

  getRecipientsArr() {
    return this.usersData.map(item => item.value);
  }


}
