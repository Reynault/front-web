import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../interfaces/recipe';
import {merge} from 'rxjs';
import {filter, mergeMap, tap} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {errorMessages} from '../constants/error.messages';
import {TokenService} from '../services/token-service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  private _isUserRecipe: boolean;

  private _createRecipe: boolean;
  private readonly _form: FormGroup;
  private _formIngredients: FormArray;
  private _formSteps: FormArray;

  private _recipe: Recipe;
  private _err: string;

  /**
   * Component constructor
   */
  constructor(private _recipeService: RecipeService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _auth: AuthService,
              private _token: TokenService) {
    this._recipe = {} as Recipe;

    this._isUserRecipe = false;
    this._createRecipe = false;

    this._form = RecipeComponent._buildBuild();
    this._formSteps = this._form.get('steps') as FormArray;
    this._formIngredients = this._form.get('ingredients') as FormArray;
  }


  addStep(v: string) {
    this._formSteps.push(new FormControl(v, Validators.compose([
      Validators.required,
    ])));
  }

  removeStep(i: number) {
    this._formSteps.removeAt(i);
  }

  addIngredient(n: string, q: number, u: string) {
    const group = new FormGroup({
      name: new FormControl(n, Validators.required),
      quantity: new FormControl(q, Validators.required),
      unit: new FormControl(u, Validators.required)
    });

    this.formIngredients.push(group);
  }

  removeIngredient(i: number) {
    this.formIngredients.removeAt(i);
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter(params => !!params.id),
        mergeMap(params => this._recipeService.fetchOne(params.id)),
      )
    ).subscribe(
      (recipe: any) => {
        this._recipe = recipe;
        if(this._token.hasToken()) {
          this._recipeService.userHasRecipe(recipe.id).subscribe(
            val => {
              this._isUserRecipe = val;
            },
            error => {
              this.handleError(error)
            }
          );
        }
        this.mapPropertiesWithForm();
      },
      error => {
        this._recipe = this._recipeService.defaultRecipe;
      }
    );
  }

  delete(): void {
    this._recipeService.delete(this.recipe.id).subscribe(
      () => this._router.navigate([this.getRouteurLink()]),
      error => this.handleError(error)
    );
  }

  update(): void {
    if (this.form.valid) {
      this._recipeService.modify(this.recipe.id, this.form.value).subscribe(
        () => this._router.navigate([this.getRouteurLink()]),
        error => this.handleError(error)
      );
    }
  }

  insert() {
    if (this.form.valid) {
      Object.assign(this.recipe, this.form.value);
      this._recipeService.create(this.recipe).subscribe(
        () => this._router.navigate([this.getRouteurLink()]),
        error => this.handleError(error)
      );
    }
  }

  private static _buildBuild(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
      steps: new FormArray([])
    });
  }

  mapPropertiesWithForm() {
    this.form.patchValue(this.recipe);
    this.recipe.steps.forEach(step =>
      this.addStep(step)
    );
    this.recipe.ingredients.forEach(ingredient =>
      this.addIngredient(
        ingredient.name,
        ingredient.quantity,
        ingredient.unit
      )
    );
  }

  getRouteurLink(): string {
    if (!this._isUserRecipe) {
      return '/recipes';
    } else {
      return '/my_recipes';
    }
  }

  handleError(error){
    switch (error.status){
      case 401:
        this._err = errorMessages.unauthorizedError;
        break;
      case 404:
        this._err = errorMessages.notFound;
        break;
      default:
        this._err = errorMessages.serverError;
        break;
    }
  }

  @Input()
  set createRecipe(value: boolean) {
    this._createRecipe = value;
  }

  get createRecipe(): boolean {
    return this._createRecipe;
  }

  set recipe(value: Recipe) {
    this._recipe = value;
  }

  get recipe(): Recipe {
    return this._recipe;
  }
  get formSteps(): FormArray {
    return this._formSteps;
  }

  get formIngredients(): FormArray {
    return this._formIngredients;
  }

  /**
   * Returns flag to know if we are on a profile or on HP
   */
  get isUserRecipe(): boolean {
    return this._isUserRecipe;
  }

  get form(): FormGroup {
    return this._form;
  }

  get err(): string {
    return this._err;
  }
}
