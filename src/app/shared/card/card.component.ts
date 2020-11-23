import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // La recette que l'on veut afficher sur la card
  private _recipe: Recipe;


  /**
   * Constructeur
   */
  constructor(private _router: Router) {
    this._recipe = {} as Recipe;
  }

  /**
   * Retourne la recette
   */
  get recipe(): Recipe {
    return this._recipe;
  }

  /**
   * Setter de la recette
   */
  @Input()
  set recipe(recipe: Recipe) {
    this._recipe = recipe;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

}
