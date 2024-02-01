import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})

/**
 * Toasts Component
 */
export class ToastsComponent implements OnInit {
  
  // bread crumb items
  breadCrumbItems: Array<{}>;
  show:boolean = true;
  translucent:boolean = true;
  stacking:boolean = true;
  stackingSec:boolean = true;
  polite:boolean= true;

  show1:boolean = false;
  autohide:boolean = true;

  constructor(public toastr:ToastrService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Toasts', active: true }];

    // this.showSuccess()
  }


   showSuccess() {
    this.toastr.success('Hello, world! This is a toast message.', 'Bootstrap');
  }


}
