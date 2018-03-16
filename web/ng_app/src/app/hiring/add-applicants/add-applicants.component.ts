import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  validateEmail,
  duplicateEmail,
  emailListRegex
} from "../shared/common/email-validator";
import { RecipientsService } from "../shared/recipients.service";
import { Router } from "@angular/router";
import { InvitationsService } from "../../shared/invitations.service";

@Component({
  selector: "app-add-applicants",
  templateUrl: "./add-applicants.component.html",
  styleUrls: ["./add-applicants.component.sass"]
})
export class AddApplicantsComponent implements OnInit {
  recipients = [];
  recipientInput: string;
  listUploaded = false;
  listInvalidEmail = false;
  duplicateEmailFlag = false;
  invalidEmailErrorFlag = false;
  recipientsArray = [
    "chris@charmingbot.com",
    "bhatti@charmingbot.com",
    "moiz@charmingbot.com",
    "hello"
  ];
  constructor(
    private recipientService: RecipientsService,
    private router: Router,
    private invitationsService: InvitationsService
  ) { }

  recipientForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required,
    Validators.pattern(emailListRegex)])
  });

  ngOnInit() {
    this.recipients = this.recipientService.usersList;
    if (this.recipients) {
      this.listInvalidEmail = this.checkForInvalidEmail(this.recipients);
    }
  }

  viewRecipients() {
    this.recipientService.usersType = "Applicants";
    this.recipientService.usersList = this.recipients;
    this.router.navigate(["hiring/edit"]);
  }

  csvUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = (e: any) => {
      this.recipients = [...this.recipients, ...e.target.result.split(/\r?\n/)];
      this.recipients = this.recipients.map(email => {
        return email.toLowerCase();
      });
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
    this.duplicateEmailFlag = false;
    if (!this.recipientForm.valid) {
      return;
    }
    let recipients = this.recipientForm.value.email.split(',');
    recipients = Array.from(new Set(recipients));
    recipients.forEach((email) => {
      if (duplicateEmail(email, this.recipients)) {
        this.duplicateEmailFlag = true;
        return;
      }
    });
    if (!this.duplicateEmailFlag) {
      this.recipients = [...this.recipients, ...recipients];
      this.recipientService.usersList = this.recipients;
      this.recipientForm.reset();
    }
  }

  remainingEntries() {
    if (this.recipients.length > 15) {
      return this.recipients.length - 16;
    }
    return 0;
  }

  sendInvitions() {
    let userType;
    if (this.recipientService.usersType.toLowerCase() === "exemplars") {
      userType = "exemplar";
    } else if (this.recipientService.usersType.toLowerCase() === "applicants") {
      userType = "applicant";
    }
    const data = {
      type: userType,
      emails: this.recipientService.usersList,
      job: "job_NDQGPGWStII1AKxM"
    };
    this.invitationsService.sendInvitations(data).subscribe(res => {
      console.log("res", res);
      this.router.navigate(['hiring/dashboard']);
    }, ((error) => {
      this.recipientService.errorFlag = true;
    }));
  }
}
