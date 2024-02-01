import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

import {jobApplyModel} from './apply.model';
import { JobApplyService } from './apply.service';
import { NgbdJobApplySortableHeader, SortEvent } from './apply-sortable.directive';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
  providers: [JobApplyService, DecimalPipe]
})

/**
 * Apply Component
 */
export class ApplyComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   jobApplyForm!: UntypedFormGroup;
   submitted:boolean = false;
 
   // Table data
   content?: any;
   applies?: any;
   jobApplay!: Observable<jobApplyModel[]>;
   total: Observable<number>;
   @ViewChildren(NgbdJobApplySortableHeader) headers!: QueryList<NgbdJobApplySortableHeader>;
 
   constructor(private modalService: BsModalService,public service: JobApplyService, private formBuilder: UntypedFormBuilder) {
     this.jobApplay = service.jobApply$;
     this.total = service.total$;
    }
 
   ngOnInit(): void {
     this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Job Apply', active: true }];
 
     /**
     * fetches data
     */
      this.jobApplay.subscribe(x => {
       this.content = this.applies;
       this.applies =  Object.assign([], x);   
     });
   }
   
    // Delete Data
    delete(event:any) {    
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger ms-2'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            event.target.closest('tr')?.remove();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            );
          }
        });
    }

}
