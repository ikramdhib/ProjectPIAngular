import { Component, OnInit } from '@angular/core';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { AuthenticationService } from 'src/app/UserServices/AuthenticationServices/authenticationUser.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  currentUser =null;
  userImage : any ="";
  revenueBarChart: ChartType;
  statData:any;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    
    this.currentUser=JSON.parse(localStorage.getItem("currentUser"));

    
   // this.userImage= this.userService.getImage("ff16c7f6-07d4-4bbf-bdd9-da61721ca9a9.jpg");
    // fetches the data
    this._fetchData();
/*
    this.userService.getImage("dhibikram00@gmail.com").subscribe({

      next :(res:any)=>{
        console.log(res.url,'@@@@@@@@@@@@@@@@@@@@@@@');
        this.userImage= res.url;
      }
    }
       
    )*/

  }

  

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }
}
