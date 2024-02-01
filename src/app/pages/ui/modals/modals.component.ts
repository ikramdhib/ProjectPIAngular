import { Component, OnInit,TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})

/**
 * UI-modals component
 */
export class ModalsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  modalRef?: BsModalRef;
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  name: any;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Modals', active: true }];
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }

  /**
   * Open small modal
   * @param smallDataModal small modal data
   */
  fullModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  openfirstModal(template: TemplateRef<any>) {
    if (this.modalRef) { 
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>) {
    if (this.modalRef) { 
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template); 
  }

  /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
  extraLarge(exlargeModal: any) {
    this.modalRef = this.modalService.show(exlargeModal, { class: 'modal-xl' });
  }

  /**
   * Open Large modal
   * @param largeDataModal large modal data
   */
  largeModal(largeDataModal: any) {
    this.modalRef = this.modalService.show(largeDataModal, { class: 'modal-lg' });
  }

  /**
   * Open small modal
   * @param smallDataModal small modal data
   */
  smallModal(smallDataModal: any) {
    this.modalRef = this.modalService.show(smallDataModal, { class: 'modal-sm' });
  }

  /**
  * Open center modal
  * @param centerDataModal center modal data
  */
  centerModal(centerDataModal: any) {
    this.modalRef = this.modalService.show(centerDataModal);
  }

  /**
   * Open scroll modal
   * @param scrollDataModal scroll modal data
   */
  scrollModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  /**
   * Static modal
   * @param StaticDataModal modal content
   */
  StaticModal(StaticDataModal: any) {
    this.modalRef = this.modalService.show(StaticDataModal);
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
  toggleModal(staticDataModal: any) {
    this.modalRef = this.modalService.show(staticDataModal);
  }
  secondModal(toggleSecondModal: any) {
    this.modalRef = this.modalService.show(toggleSecondModal);
  }

  /**
   * Open modal
   * @param content modal content
   */
  varyingModal(template: TemplateRef<any>,name:any) {
    this.name = name
    this.modalRef = this.modalService.show(template, this.config);
  }
}
