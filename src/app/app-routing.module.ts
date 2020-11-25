import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ConnectionComponent} from './connection/connection.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {UserComponent} from './user/user.component';
import {AuthGuard} from './shared/guard/auth-guard';
import {NotfoundComponent} from './notfound/notfound.component';
import {RecipeComponent} from './shared/recipe/recipe.component';
import {ListRecipComponent} from './list-recip/list-recip.component';
import {MyRecipComponent} from './my-recip/my-recip.component';
import {CreateRecipComponent} from './create-recip/create-recip.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'profile/:username', component: UserComponent},

  {path: 'recipes', component: ListRecipComponent},
  {path: 'recipes/:id', component: RecipeComponent},
  {path: 'my_recipes', component: MyRecipComponent},
  {path: 'create', component: CreateRecipComponent, canActivate: [AuthGuard]},

  // 404 route
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
