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


    this.Profile();
    
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    
    
   // this.userImage= this.userService.getImage("ff16c7f6-07d4-4bbf-bdd9-da61721ca9a9.jpg");
    // fetches the data
/*
    this.userService.getImage("dhibikram00@gmail.com").subscribe({

      next :(res:any)=>{
        console.log(res.url,'@@@@@@@@@@@@@@@@@@@@@@@');
        this.userImage= res.url;
      }
    }
       
    )*/

  }

  public Profile(){
    this.authService.getProfileUser().subscribe({
      next:(res:any)=>{
        console.log(res.Data,"ttt");
        this.currentUser = res.Data
      }
    })
  }

 
}
