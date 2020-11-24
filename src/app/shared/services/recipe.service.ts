import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../interfaces/recipe';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService{
  private readonly _backendURL: any;
  private readonly _defaultRecipe: Recipe;

  constructor(private _http: HttpClient) {
    this._defaultRecipe = {
      id: '0',
      title: 'Tarte aux pommes',
      description: 'Super tarte trop bonne de ouf',
      ingredients: [
        {
          name: 'Sucre',
          quantity: 100,
          unit: 'kg'
        },
        {
          name: 'Epices',
          quantity: 200,
          unit: 'g'
        },
        {
          name: 'Plein de bonnes choses',
          quantity: 40,
          unit: 'kg'
        }
      ],
      steps: [
        'On met le sucre',
        'On met les épices',
        'Et plein de bonnes choses'
      ]
    };
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Returns private property _defaultPerson
   */
  get defaultRecipe(): Recipe {
    return this._defaultRecipe;
  }

  /**
   * Retourne la liste des recettes
   */
  fetch(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(this._backendURL.allRecipes)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * Retourne la recette correspondant à l'id courant
   */
  fetchOne(id: string): Observable<Recipe> {
    return this._http.get<Recipe>(this._backendURL.oneRecipe.replace(':id', id));
  }

  /**
   * Retourne la liste des recettes de l'utilisateur
   */
  fetchUser(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(this._backendURL.recipesFromUser)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  userHasRecipe(id: string): Observable<boolean>{
    return this._http.get<boolean>(this._backendURL.hasRecipe, {params: {id: id}});
  }

  create(recipe: Recipe): Observable<any>{
    return this._http.post(this._backendURL.allRecipes, recipe);
  }

  modify(id: string, recipe: any) {
    return this._http.put(this._backendURL.oneRecipe.replace(':id', id), recipe);
  }

  delete(id: string) {
    return this._http.delete(this._backendURL.oneRecipe.replace(':id', id));
  }
}
