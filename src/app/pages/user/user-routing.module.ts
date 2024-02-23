import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuardsService } from '../../UserServices/Guards/authentication-guards.service';
import { AuthorizationGuardsService } from '../../UserServices/Guards/authorization-guards.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddSupervisorComponent } from './add-supervisor/add-supervisor.component';

const routes: Routes = [

  {
    path:'profile', component:ProfileComponent , canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
      roles:['ENCADRANT']
    } 
  },

  {
    path:"editProfile",component:EditProfileComponent
  },
  {
    path:"addStudent",component:AddStudentComponent
  },
  {
    path:"addSupervisor",component:AddSupervisorComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class UserRoutingModule { }

