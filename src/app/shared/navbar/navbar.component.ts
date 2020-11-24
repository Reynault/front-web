import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token-service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _user: string;

  constructor(
    private readonly _route: Router,
    private readonly _token: TokenService,
    private readonly _auth: AuthService) {
  }

  ngOnInit(): void {
  }

  connected(): boolean {
    this._user = this._token.get().username;
    return this._token.hasToken();
  }

  get user(): string {
    return this._user;
  }

  logout() {
    this._auth.logout();
    this._route.navigate(["/home"]);
  }
}
