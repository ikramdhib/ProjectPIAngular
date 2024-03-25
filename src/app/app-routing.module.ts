import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { AuthenticationGuardsService } from './UserServices/Guards/authentication-guards.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SendingMailComponent } from './forget-password/sending-mail/sending-mail.component';
import { ChangePasswordComponent } from './forget-password/change-password/change-password.component';
import { AuthorizationGuardsService } from './UserServices/Guards/authorization-guards.service';

const routes: Routes = [
  { path: 'authentication', component:AuthenticationComponent},
  { path: 'forgetPassword', component:ForgetPasswordComponent},
  { path: 'email-verification', component:SendingMailComponent},
  { path: 'ChangePassword', component:ChangePasswordComponent},
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) ,canActivate: [AuthenticationGuardsService , AuthorizationGuardsService],
   data:{
     roles:['SERVICE_STAGE','CHEF_DEPARTEMENT' , 'ENCADRANT','ETUDIANT']
   }  },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthenticationGuardsService ,AuthorizationGuardsService],
  data:{
    roles:['SERVICE_STAGE','CHEF_DEPARTEMENT' ,'ENCADRANT' ,'ETUDIANT']
  }  ,

},
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthenticationGuardsService ,AuthorizationGuardsService],
  data:{
    roles:['SERVICE_STAGE' ,'CHEF_DEPARTEMENT' , 'ENCADRANT','ETUDIANT']
  }  },
  { path: 'crypto-ico-landing', component: CyptolandingComponent ,canActivate: [AuthenticationGuardsService] },
  { path: '**', component: Page404Component ,canActivate: [AuthenticationGuardsService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
