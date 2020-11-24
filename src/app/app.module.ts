import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { DialogComponent } from './shared/dialog/dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {RecipesComponent} from './shared/recipes/recipes.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {ConnectionComponent} from './connection/connection.component';
import { UserComponent } from './user/user.component';
import {AuthorizationInterceptor} from './shared/interceptor/authorization-interceptor';
import { NotfoundComponent } from './notfound/notfound.component';
import { CardComponent } from './shared/card/card.component';
import {RecipeComponent} from './shared/recipe/recipe.component';
import {MatMenuModule} from '@angular/material/menu';
import { ListRecipComponent } from './list-recip/list-recip.component';
import { MyRecipComponent } from './my-recip/my-recip.component';
import { CreateRecipComponent } from './create-recip/create-recip.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    NavbarComponent,
    RecipesComponent,
    InscriptionComponent,
    ConnectionComponent,
    UserComponent,
    NotfoundComponent,
    RecipeComponent,
    CardComponent,
    ListRecipComponent,
    MyRecipComponent,
    CreateRecipComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatGridListModule,
    MatMenuModule,
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true} ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
