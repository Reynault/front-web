import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  // vaut vrai si un utilisateur est connecté
  private _connected: boolean;

  constructor() {
    this._connected = false;
  }

  ngOnInit(): void {
  }

  get connected(): boolean {
    return this._connected;
  }

}
