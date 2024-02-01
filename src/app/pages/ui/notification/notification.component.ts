import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})

/**
 * Notification Component
 */
export class NotificationComponent implements OnInit {

  modalRef?: BsModalRef;
  
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor(public toastService: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Notifications', active: true }];
  }

  /**
   * Standard message
   */
   showStandard() {
    var itemAmount = document.querySelector('.product-price') as HTMLInputElement;
    var text = itemAmount?.value ? itemAmount?.value : 'Welcome';
    
    // var checkboxes:any = document.getElementsByName('toast-type-radio');
    // var result = '';
    // for (var i = 0; i < checkboxes.length; i++) {
    //   if (checkboxes[i].checked) {
    //       result = checkboxes[i].value;
    //     }
    //   }  
    this.toastService.success(text,'', { timeOut : 10000 });
   }
  
  
  closetoast() {
    this.toastService.clear()
  }
  
  closelasttoast() {
    this.toastService.remove(this.toastService.currentlyActive)
   }

}
