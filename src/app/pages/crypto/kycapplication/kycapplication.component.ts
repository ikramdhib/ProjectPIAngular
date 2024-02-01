import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kycapplication',
  templateUrl: './kycapplication.component.html',
  styleUrls: ['./kycapplication.component.scss']
})
export class KycapplicationComponent implements OnInit {
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  modalRef?: BsModalRef;
  files: File[] = [];

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'KYC Application', active: true }];
  }

  /**
   * Open modal
   * @param content modal content
   */
  verificationModal(content: any) {
    this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
  }

    // File Upload
    imageURL: any;
    onSelect(event: any) {
      this.files.push(...event.addedFiles);
      let file: File = event.addedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        setTimeout(() => {
          // this.profile.push(this.imageURL)
        }, 100);
      }
      reader.readAsDataURL(file)
    }

}
