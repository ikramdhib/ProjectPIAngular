import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';

import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandeDetailsComponent } from './demande-details/demande-details.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { UploadComponent } from './upload/upload.component';
import { EventSchedulerComponent } from './event-scheduler/event-scheduler.component';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] },
  { path: 'crypto-ico-landing', component: CyptolandingComponent },
  { path: 'calendrier', component: EventSchedulerComponent },

  { path: 'upload', component: UploadComponent },
  { path: 'list-demande', component: DemandeListComponent },
  { path: 'create-demande', component: DemandeFormComponent },

  { path: 'demande-details/:id', component: DemandeDetailsComponent },




  { path: '**', component: Page404Component },
  { path: '', component: DemandeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
