import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../shared/services/recipe.service';
import {Recipe} from '../shared/interfaces/recipe';

@Component({
  selector: 'app-list-recip',
  templateUrl: './list-recip.component.html',
  styleUrls: ['./list-recip.component.css']
})
export class ListRecipComponent implements OnInit {

  private _recipes: Recipe[];

  constructor(private _recipesService: RecipeService) {
    this._recipes = [];
  }

  ngOnInit(): void {

    this._recipesService
      .fetch().subscribe((recipes: Recipe[]) => this._recipes = recipes);

  }

  get recipes(): Recipe[] {
    return this._recipes;
  }
}
