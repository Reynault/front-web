import {NgModule} from '@angular/core';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ConnectionComponent} from './connection/connection.component';
import {RecipesComponent} from './recipes/recipes.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'connection', component: ConnectionComponent},
  {path: 'recettes', component: RecipesComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
