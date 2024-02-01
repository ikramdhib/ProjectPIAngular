import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss']
})

/**
 * Tasks-create component
 */
export class CreatetaskComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  public Editor = ClassicEditor;

  form = new UntypedFormGroup({
    member: new UntypedFormArray([
      new UntypedFormControl(''),
    ]),
  });

  hidden: boolean;
  selected: any;

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;

  /**
   * Returns the form field value
   */
  get member(): UntypedFormArray { return this.form.get('member') as UntypedFormArray; }

  /**
   * Add the member field in form
   */
  addMember() {
    this.member.push(new UntypedFormControl());
  }

  /**
   * Onclick delete member from form
   */
  deleteMember(i: number) {
    this.member.removeAt(i);
  }

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Create Task', active: true }];

    this.hidden = true;
  }

  
}
