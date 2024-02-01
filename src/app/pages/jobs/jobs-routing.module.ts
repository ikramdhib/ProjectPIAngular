import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from "./list/list.component"; 
import { GridComponent } from "./grid/grid.component";
import { ApplyComponent } from "./apply/apply.component";
import { DetailsComponent } from "./details/details.component";
import { CategoriesComponent } from "./categories/categories.component";
import {CandidateListComponent} from "./candidate-list/candidate-list.component";
import { CandidateOverviewComponent } from "./candidate-overview/candidate-overview.component";

const routes: Routes = [
   {
    path:"list",
    component:ListComponent
   },
   {
    path:"grid",
    component:GridComponent
   },
   {
    path:"apply",
    component:ApplyComponent
   },
   {
    path:"details",
    component:DetailsComponent
   },
   {
    path:"categories",
    component:CategoriesComponent
   },
   {
    path:"candidate-list",
    component:CandidateListComponent
   },
   {
    path:"candidate-overview",
    component:CandidateOverviewComponent
   }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule {}
