import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuardsService } from '../../UserServices/authentication-guards.service';
import { AuthorizationGuardsService } from '../../UserServices/authorization-guards.service';

const routes: Routes = [

  {
    path:'profile', component:ProfileComponent , canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
    data:{
      roles:['ENCADRANT']
    } 
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class UserRoutingModule { }

