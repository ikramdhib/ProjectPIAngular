import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { ListforumComponent } from './listforum/listforum.component';
import { DetailComponent } from './detail/detail.component';
import { ListFavorisComponent } from './list-favoris/list-favoris.component';
import { HistoriqueComponent } from './historique/historique.component';

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
    component: DetailComponent 
  },
  {
    path: 'listFavoris',
    component: ListFavorisComponent
  },
  {
    path: 'historique',
    component: HistoriqueComponent
  }
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
