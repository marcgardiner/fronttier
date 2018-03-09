import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail } from '../shared/common/email-validator';
import { RecipientsService } from '../shared/recipients.service';
import { Router } from '@angular/router';


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
    private router: Router) { }

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
    this.recipientService.usersType = 'applicants';
    this.recipientService.usersList = this.recipients;
    this.router.navigate(['hiring/edit']);
  }

  csvUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = (e: any) => {
      this.recipients = [...this.recipients, ...e.target.result.split(/\r?\n/)];
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
    if (!this.recipientForm.valid) {
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

}
