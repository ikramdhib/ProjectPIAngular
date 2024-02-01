import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Email } from '../inbox/inbox.model';
import { emailData } from '../inbox/data';

@Component({
  selector: 'app-emailread',
  templateUrl: './emailread.component.html',
  styleUrls: ['./emailread.component.scss']
})

/**
 * Email read Component
 */
export class EmailreadComponent implements OnInit {

  modalRef?: BsModalRef;

  public index: number;
  public Editor = ClassicEditor;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  emailRead: Array<Email>;

  constructor(private route: ActivatedRoute, private modalService: BsModalService) {
    this.route.params.subscribe(params => {
      this.emailRead = emailData.filter((email) => {
        // tslint:disable-next-line: radix
        return email.id === parseInt(params.id);
      });
      this.index = params.id;
    });
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Email' }, { label: 'Read Email', active: true }];
  }

  open(content) {
    this.modalRef = this.modalService.show(content);
  }
}
