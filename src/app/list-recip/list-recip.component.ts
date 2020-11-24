import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../shared/services/recipe.service';
import {Recipe} from '../shared/interfaces/recipe';

@Component({
  selector: 'app-list-recip',
  templateUrl: './list-recip.component.html',
  styleUrls: ['./list-recip.component.css']
})
export class ListRecipComponent implements OnInit {

  private _value: string;
  private _recipes: Recipe[];
  private _filteredRecipes: Recipe[];

  constructor(private _recipesService: RecipeService) {
    this._recipes = [];
    this._filteredRecipes = [];
    this._value = "";
  }

  ngOnInit(): void {

    this._recipesService.fetch().subscribe((recipes: Recipe[]) => {
        this._recipes = recipes;
        this._filteredRecipes = recipes;
    });

  }

  search(value: string){
    const regex = new RegExp(`.*${value.toLowerCase()}.*`);
    this._filteredRecipes = this._recipes.filter(element => {
        return regex.test(element.title.toLowerCase());
      }
    )
  }

  get filteredRecipes(): Recipe[] {
    return this._filteredRecipes;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.search(value);
  }
}
