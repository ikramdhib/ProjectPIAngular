import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';


import {jobGridModel} from './grid.model';
import { JobGridService } from './grid.service';
import { NgbdJobGridSortableHeader, SortEvent } from './grid-sortable.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [JobGridService, DecimalPipe]
})

/**
 * Grid Component
 */
export class GridComponent implements OnInit {

  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public isCollapsed: boolean = true;
  submitted: boolean = false;
  // Table data
  content?: any;
  grids?: any;
  jobGrid!: Observable<jobGridModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdJobGridSortableHeader) headers!: QueryList<NgbdJobGridSortableHeader>;

  constructor(public service: JobGridService, private formBuilder: UntypedFormBuilder,private modalService: BsModalService) {
    this.jobGrid = service.jobGrid$;
    this.total = service.total$;
  }

  ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Jobs' }, { label: 'Jobs Grid', active: true }];
   /**
   * fetches data
   */
    this.jobGrid.subscribe(x => {
     this.content = this.grids;
     this.grids =  Object.assign([], x);   
   });
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.submitted = false;
    this.modalRef = this.modalService.show(content, { class: 'modal-md' });
  }


}
