import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail, duplicateEmail } from '../shared/common/email-validator';
import { RecipientsService } from '../shared/recipients.service';
import { Router } from '@angular/router';
import { InvitationsService } from '../../shared/invitations.service';


@Component({
  selector: 'app-add-applicants',
  templateUrl: './add-applicants.component.html',
  styleUrls: ['./add-applicants.component.sass']
})
export class AddApplicantsComponent implements OnInit {

  recipients = [];
  recipientInput: string;
  listUploaded = false;
  listInvalidEmail = false;
  recipientsArray = ['chris@charmingbot.com', 'bhatti@charmingbot.com', 'moiz@charmingbot.com', 'hello'];
  constructor(private recipientService: RecipientsService,
    private router: Router,
    private invitationsService: InvitationsService) { }

  recipientForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit() {
    this.recipients = this.recipientService.usersList;
    if (this.recipients) {
      this.listInvalidEmail = this.checkForInvalidEmail(this.recipients);
    }
  }

  viewRecipients() {
    this.recipientService.usersType = 'Applicants';
    this.recipientService.usersList = this.recipients;
    this.router.navigate(['hiring/edit']);
  }

  csvUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = (e: any) => {
      this.recipients = [...this.recipients, ...e.target.result.split(/\r?\n/)];
      this.recipients = Array.from(new Set(this.recipients));
      this.listInvalidEmail = this.checkForInvalidEmail(this.recipients);
    };
  }

  checkForInvalidEmail(recipientsArr) {
    let invalidFlag = false;
    recipientsArr.forEach(element => {
      if (!validateEmail(element)) {
        invalidFlag = true;
        return;
      }
    });
    return invalidFlag;
  }

  saveRecipient() {
    if (!this.recipientForm.valid || duplicateEmail(this.recipientForm.value.email, this.recipients)) {
      return;
    }
    this.recipients.push(this.recipientForm.value.email);
    this.recipientForm.reset();
  }

  remainingEntries() {
    if (this.recipients.length > 15) {
      return this.recipients.length - 16;
    }
    return 0;
  }

  sendInvitions() {
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

}
