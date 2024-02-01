import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-advancedform',
  templateUrl: './advancedform.component.html',
  styleUrls: ['./advancedform.component.scss']
})

/**
 * Form advanced form
 */
export class AdvancedformComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  constructor() { }

  // Component colorpicker
  componentcolor: string;
  rgbcolor: string;
  color: string;
  presetcolor: string;
  inlinecolor: string;

 

  hidden: boolean;
  selected: any;

  date: { year: number, month: number };
  // Select2 Dropdown
  selectValue: string[];

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Advanced', active: true }];
    // Component color value of color picker
    this.componentcolor = '#3bafda';
    this.presetcolor = '#2889e9';
    this.rgbcolor = 'rgba(0, 194, 255, 0.78)';
    this.inlinecolor = '#400e12';
    this.color = '#8FFF00';

    // Select dropdown value
    // tslint:disable-next-line: max-line-length
    this.selectValue = ['Alaska', 'Hawaii', 'California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorado', 'Idaho', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Illinois', 'Iowa'];

    this.selected = '';
    this.hidden = true;
  }

}
