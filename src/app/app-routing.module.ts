import {NgModule} from '@angular/core';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ConnectionComponent} from './connection/connection.component';
import {RecipiesComponent} from './recipes/recipies.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'connection', component: ConnectionComponent},
  {path: 'recettes', component: RecipiesComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
