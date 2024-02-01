import { Component, OnInit } from '@angular/core';

import { UntypedFormGroup, UntypedFormArray, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.scss']
})

/**
 * Form repeater component
 */
export class RepeaterComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  form: UntypedFormGroup;
  phoneData: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      formlist: this.fb.array([]),
    }),

    this.phoneData = this.fb.group({
      phoneValue: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Repeater', active: true }];

    this.formData().push(this.field());
    this.phonedata().push(this.phone());
  }

  formData(): UntypedFormArray {
    return this.form.get('formlist') as UntypedFormArray;
  }

  phonedata(): UntypedFormArray {
    return this.phoneData.get('phoneValue') as UntypedFormArray;
  }

  phone(): UntypedFormGroup {
    return this.fb.group({
      phonenumber: ''
    });
  }

  field(): UntypedFormGroup {
    return this.fb.group({
      name: '',
      email: '',
      subject: '',
      file: '',
      msg: '',
    });
  }

  /**
   * Add phone field in list
   */
  addPhone() {
    this.phonedata().push(this.phone());
  }

  /**
   * Remove field from form
   * @param i specified index to remove
   */
  removeField(i: number) {
    if (confirm('Are you sure you want to delete this element?')) {
      this.formData().removeAt(i);
    }
  }

  /**
   * Delete phone field from list
   * @param i specified index
   */
  deletePhone(i: number) {
    this.phonedata().removeAt(i);
  }

  /**
   * Add field in form
   */
  addField() {
    this.formData().push(this.field());
  }
}
