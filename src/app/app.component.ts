import {Component} from '@angular/core';
import {TokenService} from './shared/services/token-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-web';

  constructor(private _token: TokenService) {
  }

  token(): boolean{
    return this._token.hasToken();
  }
}

