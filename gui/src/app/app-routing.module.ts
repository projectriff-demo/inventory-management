import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleCreationComponent} from './article/article-creation.component';
import {HomeComponent} from "./home/home.component";
import {ArticleListComponent} from "./article/article-list.component";


const routes: Routes = [
  {path: 'new', component: ArticleCreationComponent},
  {path: 'list', component: ArticleListComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
