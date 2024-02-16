import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { ListforumComponent } from './listforum/listforum.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
      path: 'addquestion',
      component: AddquestionComponent
  },
  {
    path: 'listforum',
    component: ListforumComponent
  },
  { 
    path: 'detail/:id', 
    component: DetailComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
