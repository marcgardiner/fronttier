import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllRecipientsModalComponent } from '../modals/all-recipients-modal/all-recipients-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validateEmail } from '../shared/common/email-validator';


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
  constructor(private modalService: NgbModal) { }

  recipientForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit() {
  }

  sendInvites() {
    const recipientsModal = this.modalService.open(AllRecipientsModalComponent, {
      size: 'lg'
    });
    recipientsModal.componentInstance.usersType = 'applicants';
    recipientsModal.componentInstance.usersList = this.recipients;
    recipientsModal.componentInstance.updatedRecipients.subscribe((recipients) => {
      this.recipients = recipients;
      this.listInvalidEmail = this.checkForInvalidEmail(this.recipients);
    });
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
  }

  remainingEntries() {
    if (this.recipients.length > 15) {
      return this.recipients.length - 16;
    }
    return 0;
  }

}
