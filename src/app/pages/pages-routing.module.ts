
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StageListtComponent } from './stage-listt/stage-listt.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UserListComponent } from './user-list/user-list.component';
import { AttestationComponent } from './attestation/attestation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NourComponent } from './nour/nour.component';
import { ListEtudiantServiceStageComponent } from './list-etudiant-service-stage/list-etudiant-service-stage.component';
import { CalendarComponent } from "./calendar/calendar.component";
import { ChatComponent } from "./chat/chat.component";
import { DefaultComponent } from "./dashboards/default/default.component";
import { FilemanagerComponent } from "./filemanager/filemanager.component";
import { StageetudiantComponent } from "./stageetudiant/stageetudiant.component";
import { ProcessusstageetudiantComponent } from "./processusstageetudiant/processusstageetudiant.component";
import { GerernoteComponent } from "./gerernote/gerernote.component";

import { OffreComponent } from './offrestage/offrestage.component';
import { ListeoffreencadrantComponent } from './listeoffreencadrant/listeoffreencadrant.component';
import { ListeoffreetudiantComponent } from './listeoffreetudiant/listeoffreetudiant.component';
const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: DefaultComponent,
  },
  { path: "dashboard", component: DefaultComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "addstage", component: StageetudiantComponent },
  { path: "processusStage", component: ProcessusstageetudiantComponent},
  { path: "gererNote", component: GerernoteComponent},
  { path: "filemanager", component: FilemanagerComponent },
  {
    path: "dashboards",
    loadChildren: () =>
      import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),
  },
  {
    path: "ecommerce",
    loadChildren: () =>
      import("./ecommerce/ecommerce.module").then((m) => m.EcommerceModule),
  },
  {
    path: "crypto",
    loadChildren: () =>
      import("./crypto/crypto.module").then((m) => m.CryptoModule),
  },
  {
    path: "email",
    loadChildren: () =>
      import("./email/email.module").then((m) => m.EmailModule),
  },
  {
    path: "invoices",
    loadChildren: () =>
      import("./invoices/invoices.module").then((m) => m.InvoicesModule),
  },
  {
    path: "projects",
    loadChildren: () =>
      import("./projects/projects.module").then((m) => m.ProjectsModule),
  },
  {
    path: "tasks",
    loadChildren: () =>
      import("./tasks/tasks.module").then((m) => m.TasksModule),
  },
  {
    path: "contacts",
    loadChildren: () =>
      import("./contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then((m) => m.BlogModule),
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./utility/utility.module").then((m) => m.UtilityModule),
  },
  {
    path: "ui",
    loadChildren: () => import("./ui/ui.module").then((m) => m.UiModule),
  },
  {
    path: "form",
    loadChildren: () => import("./form/form.module").then((m) => m.FormModule),
  },
  {
    path: "tables",
    loadChildren: () =>
      import("./tables/tables.module").then((m) => m.TablesModule),
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "charts",
    loadChildren: () =>
      import("./chart/chart.module").then((m) => m.ChartModule),
  },
  {
    path: "maps",
    loadChildren: () => import("./maps/maps.module").then((m) => m.MapsModule),
  },
  {
    path: "jobs",
    loadChildren: () => import("./jobs/jobs.module").then((m) => m.JobsModule),
  },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m=>m.UserModule) },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'attestation-stage/:studentId/:stageId', component: AttestationComponent },
  {path:'stage',component:NourComponent},
  {path:'serviceStage',component:ListEtudiantServiceStageComponent},
  { path: 'chat', component: ChatComponent },
  {path:'stageList',component:StageListtComponent},
  {path:'userr',component:UserListComponent},
  { path: 'filemanager', component: FilemanagerComponent },
  {path:'offre',component:OffreComponent},
  {path:'listeencadrant',component:ListeoffreencadrantComponent},
  {path:'listedesoffre',component:ListeoffreetudiantComponent},



  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'forum', loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule)},
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
