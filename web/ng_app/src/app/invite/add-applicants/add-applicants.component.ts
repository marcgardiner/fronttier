import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllRecipientsModalComponent } from '../modals/all-recipients-modal/all-recipients-modal.component';


@Component({
  selector: 'app-add-applicants',
  templateUrl: './add-applicants.component.html',
  styleUrls: ['./add-applicants.component.sass']
})
export class AddApplicantsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  sendInvites() {
    const recipientsModal = this.modalService.open(AllRecipientsModalComponent, {
      size: 'lg'
    });
    recipientsModal.componentInstance.usersType = 'applicants';
    recipientsModal.componentInstance.usersList = ['chris@charmingbot.com', 'bhatti@charmingbot.com', 'moiz@charmingbot.com', 'hello'];
  }

}
