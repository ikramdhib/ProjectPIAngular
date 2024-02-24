import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/EncadrantProfile/profile.component';
import { AuthenticationGuardsService } from '../../UserServices/Guards/authentication-guards.service';
import { AuthorizationGuardsService } from '../../UserServices/Guards/authorization-guards.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddSupervisorComponent } from './add-supervisor/add-supervisor.component';
import { StudentProfileComponent } from './profile/StudentProfile/student-profile/student-profile.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ListSupervisorComponent } from './list-supervisor/list-supervisor.component';

const routes: Routes = [

  {
    path:'profile', component:ProfileComponent , 
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
      roles:['ENCADRANT','ETUDIANT']
    } 
  },

  {
    path:'Studentprofile', component:StudentProfileComponent , 
    canActivate: [AuthenticationGuardsService /*, AuthorizationGuardsService*/],
   /* data:{
      roles:['ENCADRANT']
    } */
  },

  {
    path:'student-users', component:ListStudentsComponent , 
    canActivate: [AuthenticationGuardsService /*, AuthorizationGuardsService*/],
   /* data:{
      roles:['ENCADRANT']
    } */
  },

  {
    path:'supervisor-users', component:ListSupervisorComponent , 
    canActivate: [AuthenticationGuardsService /*, AuthorizationGuardsService*/],
   /* data:{
      roles:['ENCADRANT']
    } */
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

