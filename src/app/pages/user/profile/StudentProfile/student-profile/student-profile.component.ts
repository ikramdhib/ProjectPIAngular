import { Component } from '@angular/core';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent {
  // bread crumb items
  breadCrumbItems: Array<{}>;
   currentUser =null;
  revenueBarChart: ChartType;
  statData:any;
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));
    // fetches the data
    this._fetchData();
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = this.revenueBarChart;
    this.statData = this.statData;
  }
}
