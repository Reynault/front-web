import {Component, OnInit} from '@angular/core';
import {Recipe} from '../shared/interfaces/recipe';
import {RecipeService} from '../shared/services/recipe.service';

@Component({
  selector: 'app-my-recip',
  templateUrl: './my-recip.component.html',
  styleUrls: ['./my-recip.component.css']
})
export class MyRecipComponent implements OnInit {

  private _recipes: Recipe[];

  constructor(private _recipesService: RecipeService) {
    this._recipes = [];
  }

  ngOnInit(): void {
    this._recipesService.fetchUser().subscribe(
      (recipes: Recipe[]) => this._recipes = recipes
    );
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }
}
