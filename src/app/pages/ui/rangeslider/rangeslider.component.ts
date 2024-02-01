import { Component, OnInit } from '@angular/core';

import { Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-rangeslider',
  templateUrl: './rangeslider.component.html',
  styleUrls: ['./rangeslider.component.scss']
})

/**
 * UI range-slider component
 */
export class RangesliderComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  defaultVal :number = 34;
  option: Options = {
    floor: 10,
    ceil: 100
  };

  value:number = 40;
  highValue:number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  custom:number = 12;
  customOption: Options = {
    floor: 10,
    ceil: 100,
    step: 5
  };

  floatValue:number = 0.5;
  floatingOptions: Options = {
    floor: 0,
    ceil: 2,
    step: 0.1
  };

  value1:number = 100;
  minVal:number = 100;
  maxVal:number = 400;
  option1: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  tickvalue:number = 10;
  tickhighValue:number = 90;
  tickoptions: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };

  draggableminValue:number = 5;
  draggablemaxValue:number = 8;
  draggableoptions: Options = {
    floor: 0,
    ceil: 10,
    draggableRange: true
  };

  tickValue:number = 5;
  tickValueoptions: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: 'Very poor' },
      { value: 2 },
      { value: 3, legend: 'Fair' },
      { value: 4 },
      { value: 5, legend: 'Average' },
      { value: 6 },
      { value: 7, legend: 'Good' },
      { value: 8 },
      { value: 9, legend: 'Excellent' }
    ]
  };

  visibleSelection:number = 5;
  visibleBarOptions: Options = {
    floor: 0,
    ceil: 10,
    showSelectionBar: true
  };

  logscale:number = 1;
  logscaleoptions: Options = {
    floor: 1,
    ceil: 100,
    logScale: true,
    showTicks: true
  };

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Range Slider', active: true }];

  }

}
