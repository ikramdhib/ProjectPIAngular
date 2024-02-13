import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { AuthenticationGuardsService } from './UserServices/authentication-guards.service';


const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m=>m.UserModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) ,canActivate: [AuthenticationGuardsService] },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthenticationGuardsService ]

},
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthenticationGuardsService] },
  { path: 'crypto-ico-landing', component: CyptolandingComponent ,canActivate: [AuthenticationGuardsService] },
  { path: '**', component: Page404Component ,canActivate: [AuthenticationGuardsService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
