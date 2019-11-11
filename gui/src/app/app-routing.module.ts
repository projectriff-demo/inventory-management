import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleCreationComponent} from './article/article-creation.component';
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: 'new', component: ArticleCreationComponent},
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
