import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllRecipientsModalComponent } from '../modals/all-recipients-modal/all-recipients-modal.component';


@Component({
  selector: 'app-add-applicants',
  templateUrl: './add-applicants.component.html',
  styleUrls: ['./add-applicants.component.sass']
})
export class AddApplicantsComponent implements OnInit {

  recipients;
  recipientsArray = ['chris@charmingbot.com', 'bhatti@charmingbot.com', 'moiz@charmingbot.com', 'hello'];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  sendInvites() {
    const recipientsModal = this.modalService.open(AllRecipientsModalComponent, {
      size: 'lg'
    });
    recipientsModal.componentInstance.usersType = 'applicants';
    recipientsModal.componentInstance.usersList = this.recipientsArray;
  }

  csvUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = (e: any) => {
      this.recipients = e.target.result;
      this.recipientsArray = e.target.result.split(/\r?\n/);
    };
  }

}
