import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../interfaces/recipe';
import {merge} from 'rxjs';
import {filter, mergeMap, tap} from 'rxjs/operators';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipy',
  templateUrl: './recipy.component.html',
  styleUrls: ['./recipy.component.css']
})
export class RecipyComponent implements OnInit {

  // la recette
  private _recipe: Recipe;

  // vaut vrai si la recette appartient à l'utilisateur
  private _isUserRecipe: boolean;

  private readonly _delete$: EventEmitter<Recipe>;
  private readonly _update$: EventEmitter<Recipe>;
  private _formIngredients: FormArray;
  private _formSteps: FormArray;

  /**
   * Component constructor
   */
  constructor(private _recipeService: RecipeService, private _route: ActivatedRoute) {
    this._recipe = {} as Recipe;
    this._isUserRecipe = false;
    this._delete$ = new EventEmitter<Recipe>();
    this._update$ = new EventEmitter<Recipe>();
  }

  /**
   * Returns private property _person
   */
  get recipe(): Recipe {
    return this._recipe;
  }

  /**
   * Returns flag to know if we are on a profile or on HP
   */
  get isUserRecipe(): boolean {
    return this._isUserRecipe;
  }

  get formIngredients(): FormArray {
    return this._formIngredients;
  }

  get formSteps(): FormArray {
    return this._formSteps;
  }

  @Output('deleteRecipe') get delete$(): EventEmitter<Recipe> {
    return this._delete$;
  }

  @Output('updateRecipe') get update$(): EventEmitter<Recipe> {
    return this._delete$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        mergeMap(params => this._recipeService.fetchOne(params.id)),
        tap(_ => this._isUserRecipe = true)
      )
    )
      .subscribe(
        (person: any) => this._recipe = person,
        () => {
          // manage error when user doesn't exist in DB
          this._recipe = this._recipeService.defaultRecipe;
        }
      );
  }

  delete(recipe: Recipe): void {
    this._delete$.emit(recipe);
  }

  update(recipe: Recipe): void {
    this._update$.emit(recipe);
  }

}
