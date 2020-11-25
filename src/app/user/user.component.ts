import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../shared/services/token-service';
import {AuthService} from '../shared/services/auth.service';
import {PasswordValidators} from '../shared/validators/password-validators';
import {ActivatedRoute, Router} from '@angular/router';
import {errorMessages} from '../shared/constants/error.messages';
import {map, mergeMap, tap} from 'rxjs/operators';
import {User} from '../shared/interfaces/user';
import {EmailValidators} from '../shared/validators/email-validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private _isUserConnected: boolean;
  private readonly _form: FormGroup;
  private _err: string;
  private _user: User;

  constructor(private _token: TokenService,
              private readonly _auth: AuthService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this._form = UserComponent._buildForm();
    this._isUserConnected = false;
  }

  ngOnInit(): void {
    this._route.params.pipe(
      tap(params => this._isUserConnected = (this._token.hasToken() && params.username === this._token.get().username)),
      tap(params => (this._user = params.username)),
      mergeMap(params => this._auth.get(params.username))
    ).subscribe(
      user => {
        this._user = user;
        this._form.patchValue(user);
      },
      () => this._router.navigate(['/404'])
    );
  }

  get form(): FormGroup {
    return this._form;
  }

  get err(): string {
    return this._err;
  }

  get user(): User {
    return this._user;
  }

  delete(){
    this._auth.delete().subscribe(
      () => {
        this._router.navigate(["/home"]);
      },
      error => this._handleError(error)
    );
  }

  modify(){
    if(this._form.valid) {
      let v = this._form.value;
      delete v.username;
      delete v.confirmation;
      this._auth.modify(this._user.username, this._form.value).subscribe(
        () => {
          this._router.navigate(["/connection"])
        },
        error => this._handleError(error)
      )
    }
  }

  private static _buildForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        EmailValidators.email,
        Validators.maxLength(50)
      ])),
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        PasswordValidators.hasUpperCase,
        PasswordValidators.hasNumber,
        Validators.maxLength(200)
      ])),
      confirmation: new FormControl('',
        Validators.compose([
          Validators.required
        ]))
    }, {validators: PasswordValidators.checkConfirm});
  }

  private _handleError(error){
    switch (error.status) {
      case 404:
        this._router.navigate(['/404']);
        this._err = errorMessages.notFound;
        break;
      case 401:
        this._err = errorMessages.unauthorizedError;
        break;
      default:
        this._err = errorMessages.serverError
        break;
    }
  }

  get isUserConnected(): boolean {
    return this._isUserConnected;
  }
}
