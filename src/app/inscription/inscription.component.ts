import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from '../shared/validators/password-validators';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {errorMessages} from '../shared/constants/error.messages';
import {EmailValidators} from '../shared/validators/email-validators';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  private readonly _form: FormGroup;
  private _err: string;

  constructor(private readonly _auth: AuthService,
              private _router: Router) {
    this._form = InscriptionComponent._buildForm();
  }

  private static _buildForm() {
    return new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
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

  ngOnInit(): void {
  }

  get form(): FormGroup {
    return this._form;
  }

  get err(): string {
    return this._err;
  }

  subscribe() {
    if (this.form.valid) {
      let u = this._form.value;
      delete u.confirmation;
      this._auth.subscribe(u).subscribe(
        () => {
          this._router.navigate(['/home']);
        },
        error => {
          switch (error.error.statusCode) {
            case 409:
              this._err = errorMessages.userAlreadyExists;
              break;
            default:
              this._err = errorMessages.serverError;
              break;
          }
        }
      );
    }
  }
}
