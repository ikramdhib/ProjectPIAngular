import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})

/**
 * Rating Component
 */
export class RatingComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  readonly:boolean = false;
  currentRate :number= 0;
  stepRate:number = 2;
  readRate:number = 3;
  hoverSelect:number = 2;
  customColor:number = 4;
  clearRate:number = 2;
  stepHeart:number = 2;
  x:number = 5;
  y:number = 2;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'UI Elements' }, { label: 'Rating', active: true }];
  }

}
