import {NgModule} from '@angular/core';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ConnectionComponent} from './connection/connection.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipyComponent} from './shared/recipe/recipy.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'connection', component: ConnectionComponent},
  {path: 'recipes', component: RecipesComponent},
  { path: 'recipes/:id', component: RecipyComponent },
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
