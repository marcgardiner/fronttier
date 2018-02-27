import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { element } from 'protractor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  ngOnInit() {
    this.usersList.forEach((item, i) => {
      const validEmail = this.validateEmail(item);
      if (validEmail) {
        this.usersData.push({
          value: item,
          valid: this.validateEmail(item)
        });
      } else {
        this.usersData.unshift({
          value: item,
          valid: this.validateEmail(item)
        });
      }
    });
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
    this.editUser.index = null;
  }


}
