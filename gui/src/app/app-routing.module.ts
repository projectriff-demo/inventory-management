import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemCreationComponent} from './item/item-creation.component';
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: 'new', component: ItemCreationComponent},
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
