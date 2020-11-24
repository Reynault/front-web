import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../shared/services/token-service';
import {AuthService} from '../shared/services/auth.service';
import {PasswordValidators} from '../shared/validators/password-validators';
import {Router} from '@angular/router';
import {errorMessages} from '../shared/constants/error.messages';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private readonly _form: FormGroup;
  private _err: string;
  private readonly _user: string;

  constructor(private _token: TokenService, private readonly _auth: AuthService,
              private _router: Router) {
    this._form = UserComponent._buildForm();
    this._user = this._token.get().username;
  }

  ngOnInit(): void {
  }

  get form(): FormGroup {
    return this._form;
  }

  get err(): string {
    return this._err;
  }

  get user(): string {
    return this._user;
  }

  delete(){
    this._auth.delete().subscribe(
      () => {
        this._router.navigate(["/home"]);
      },
      error => {
        switch (error.status) {
          case 404:
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
    );
  }

  modify(){
    if(this._form.valid) {
      this._auth.modify(this._user, this._form.value).subscribe(
        () => {
          this._router.navigate(["/connection"])
        },
        error => {
          switch (error.status){
            case 401:
              this._err = errorMessages.unauthorizedError;
              break;
            default:
              this._err = errorMessages.serverError
              break;
          }
        }
      )
    }
  }

  private static _buildForm(): FormGroup {
    return new FormGroup({
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
}
