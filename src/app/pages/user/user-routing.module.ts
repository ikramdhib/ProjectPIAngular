import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/EncadrantProfile/profile.component';
import { AuthenticationGuardsService } from '../../UserServices/Guards/authentication-guards.service';
import { AuthorizationGuardsService } from '../../UserServices/Guards/authorization-guards.service';
import { EditProfileComponent } from './profile/edit-profileEncadrant/edit-profile.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddSupervisorComponent } from './add-supervisor/add-supervisor.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { ListSupervisorComponent } from './list-supervisor/list-supervisor.component';
import { EditProfileStudentComponent } from './profile/edit-profile-student/edit-profile-student.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ListServicestageComponent } from './list-servicestage/list-servicestage.component';

const routes: Routes = [

  {
    path:'profile', component:ProfileComponent , 
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
      roles:['SERVICE_STAGE','CHEF_DEPARTEMENT','ENCADRANT','ETUDIANT']
    } 
  },


  {
    path:'student-users', component:ListStudentsComponent , 
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
   data:{
     roles:['SERVICE_STAGE','CHEF_DEPARTEMENT']
    } 
  },

  {
    path:'intership-service-users', component:ListServicestageComponent , 
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
     roles:['SERVICE_STAGE','CHEF_DEPARTEMENT']
    } 
  },

  {
    path:'supervisor-users', component:ListSupervisorComponent , 
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
     roles:['SERVICE_STAGE','CHEF_DEPARTEMENT']
    } 
  },


  {
    path:"editProfile/:id",component:EditProfileComponent ,
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
     roles:['ENCADRANT']
    } 
  },
  {
    path:"editStudentProfile/:id",component:EditProfileStudentComponent,
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
     roles:['ETUDIANT']
    }
  },
  {
    path:"addStudent",component:AddStudentComponent,
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
     roles:['SERVICE_STAGE','CHEF_DEPARTEMENT']
    } 
  },
  {
    path:"addSupervisor",component:AddSupervisorComponent,
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
     roles:['SERVICE_STAGE','CHEF_DEPARTEMENT']
    } 
  },
  {
    path:"changePassword/:id",component:ChangePasswordComponent,
    canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
      roles:['SERVICE_STAGE','CHEF_DEPARTEMENT','ENCADRANT','ETUDIANT']
    } 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class UserRoutingModule { }

