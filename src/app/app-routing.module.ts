import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';

  import { StageListComponent } from './stage-list/stage-list.component';
import { NourComponent } from './nour/nour.component';
import { StageListtComponent } from './pages/stage-listt/stage-listt.component';
import { FormModule } from './pages/form/form.module';



const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] },
  {path:'stageList',component:StageListComponent},
  { path: 'crypto-ico-landing', component: CyptolandingComponent },

{path:'nour',component:NourComponent},
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),FormModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
