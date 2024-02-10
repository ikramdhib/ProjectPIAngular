import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { ListforumComponent } from './listforum/listforum.component';

const routes: Routes = [
  {
      path: 'addquestion',
      component: AddquestionComponent
  },
  {
    path: 'listforum',
    component: ListforumComponent
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
