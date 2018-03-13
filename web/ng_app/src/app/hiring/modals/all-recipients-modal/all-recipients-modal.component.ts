import { Component, OnInit, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { validateEmail, duplicateEmail } from '../../shared/common/email-validator';
import { RecipientsService } from '../../shared/recipients.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvitationsService } from '../../../shared/invitations.service';

@Component({
  selector: 'app-all-recipients-modal',
  templateUrl: './all-recipients-modal.component.html',
  styleUrls: ['./all-recipients-modal.component.sass']
})
export class AllRecipientsModalComponent implements OnInit {

  usersList: string[] = [];
  usersType: string;
  user: string;
  editUserIndex: number = null;
  hoveredIndex;
  editUser: any = {};
  showUserLabel = false;
  showEditUserLabel = false;
  usersData = [];
  invalidEmail = false;


  @ViewChild('test') test;
  constructor(private recipientService: RecipientsService,
    private invitationsService: InvitationsService) {
  }
  @Output() updatedRecipients = new EventEmitter();

  recipientForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit() {
    this.usersType = this.recipientService.usersType;
    this.recipientService.usersList.forEach((item, i) => {
      const validEmail = validateEmail(item);
      if (validEmail) {
        this.usersData.push({
          value: item,
          valid: validateEmail(item)
        });
      } else {
        this.invalidEmail = true;
        this.usersData.unshift({
          value: item,
          valid: validateEmail(item)
        });
      }
    });
  }

  removeUser(user) {
    this.usersData.splice(this.usersData.indexOf(user), 1);
    this.recipientService.usersList = this.getRecipientsArr();
    this.invalidEmail  = this.invalidEmails();
  }

  addnewUser() {
    if (!this.recipientForm.valid || duplicateEmail(this.recipientForm.value.email, this.recipientService.usersList)) {
      return;
    }
    const data = {
      value: this.recipientForm.controls.email.value,
      valid: true
    };
    this.usersData.push(data);
    this.recipientService.usersList = this.getRecipientsArr();
    this.recipientForm.controls.email.reset();
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
    if (!validateEmail(this.editUser.value)) {
      return;
    }
    this.usersData[this.editUser.index].value = this.editUser.value;
    this.usersData[this.editUser.index].valid = validateEmail(this.editUser.value);
    this.editUser.index = null;
    this.recipientService.usersList = this.getRecipientsArr();
    this.invalidEmail  = this.invalidEmails();
  }

  getRecipientsArr() {
    return this.usersData.map(item => item.value);
  }

  sendInvitations() {
    const data = {
      type: this.recipientService.usersType.toLowerCase(),
      emails: this.recipientService.usersList,
      job: 'job_xyz'
    };
    this.invitationsService.sendInvitations(data)
      .subscribe((res) => {
        console.log('res', res);
      });
  }

  invalidEmails() {
    let invalidEmail = false;
    this.recipientService.usersList.forEach((elem) => {
      if (!validateEmail(elem)) {
        invalidEmail = true;
        return;
      }
    });
    return invalidEmail;
  }


}
