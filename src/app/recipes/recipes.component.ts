import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../shared/interfaces/recipe';
import {Router} from '@angular/router';
import {RecipeService} from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  private _recipes: Recipe[];

  constructor(private _router: Router, private _peopleService: RecipeService) {
    this._recipes = [];
  }

  /**
   * Retourne la liste des recettes
   */
  get recipes(): Recipe[] {
    return this._recipes;
  }

  ngOnInit(): void {
    this._peopleService
      .fetch().subscribe((recipes: Recipe[]) => this._recipes = recipes);
  }

}
