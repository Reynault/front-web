import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from '../shared/validators/password-validators';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {errorMessages} from '../shared/constants/error.messages';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  private readonly _form: FormGroup;
  private _err: string;

  constructor(private readonly _auth: AuthService,
              private _router: Router) {
    this._form = ConnectionComponent._buildForm();
  }

  ngOnInit(): void {
  }

  get form(): FormGroup {
    return this._form;
  }

  get err(): string {
    return this._err;
  }

  private static _buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        PasswordValidators.hasUpperCase,
        PasswordValidators.hasNumber,
        Validators.maxLength(200)
      ]))
    });
  }

  submit(): void {
    if (this.form.valid) {
      this._auth.connect(this.form.value).subscribe(
        () => {
          this._router.navigate(['/home']);
        },
        (error) => {
          switch (error.status) {
            case 401:
              this._err = errorMessages.wrongData;
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
