import { Component, OnInit } from '@angular/core';


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
  currentUser :any;
  userImage : any ="";
  revenueBarChart: ChartType;
  statData:any;

  constructor( public authService : AuthenticationService) { }

  ngOnInit() {
    this.authService.getProfileUser().subscribe({
      next:(res:any)=>{
        console.log(res.Data,"ttt");
        this.currentUser = res.Data
      }
    })
    
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
  }


 
}
