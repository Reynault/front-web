import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../shared/services/recipe.service';
import {Recipe} from '../shared/interfaces/recipe';

@Component({
  selector: 'app-list-recip',
  templateUrl: './list-recip.component.html',
  styleUrls: ['./list-recip.component.css']
})
export class ListRecipComponent implements OnInit {

  private _valueTitle: string;
  private _valueAuthor: string;
  private _recipes: Recipe[];
  private _filteredRecipes: Recipe[];
  private _loading: boolean;

  constructor(private _recipesService: RecipeService) {
    this._recipes = [];
    this._filteredRecipes = [];
    this._valueAuthor = "";
    this._valueTitle = "";
    this._loading = true;
  }

  ngOnInit(): void {

    this._recipesService.fetch().subscribe((recipes: Recipe[]) => {
        this._recipes = recipes;
        this._filteredRecipes = recipes;
        this._loading = false;
    });

  }

  search(){
    const regexA = new RegExp(`.*${this._valueAuthor.toLowerCase()}.*`);
    const regexT = new RegExp(`.*${this._valueTitle.toLowerCase()}.*`);
    this._filteredRecipes = this._recipes.filter(element => {
        return regexA.test(element.username.toLowerCase())
          && regexT.test(element.title.toLowerCase()) ;
      }
    )
  }

  get filteredRecipes(): Recipe[] {
    return this._filteredRecipes;
  }

  get valueAuthor(): string {
    return this._valueAuthor;
  }

  set valueAuthor(value: string) {
    this._valueAuthor = value;
    this.search();
  }

  get valueTitle(): string {
    return this._valueTitle;
  }

  set valueTitle(value: string) {
    this._valueTitle = value;
    this.search();
  }

  get loading(): boolean {
    return this._loading;
  }
}
