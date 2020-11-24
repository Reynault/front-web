import { Component, OnInit } from '@angular/core';
import {TokenService} from '../shared/services/token-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly _token: TokenService) { }

  ngOnInit(): void {
  }

  connected():boolean{
    return this._token.hasToken();
  }
}
