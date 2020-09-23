import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from 'querystring';
import { MvLogin } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  login: MvLogin = <MvLogin>{};

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitHandler() {
    // @todo add error check
    if (this.loginForm.invalid) {
      this.openSnackBar('Invalid form check your detail', '');
      return;
    }
    this.login.username = this.loginForm.get('username').value.trim();
    this.login.password = this.loginForm.get('password').value.trim();

    this.loginService.getLogin(this.login).subscribe((response: any) => {
      if (response) {
        this.openSnackBar('Login Success!', 'success');
      } else {
        this.openSnackBar('Something went wrong', '');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: [action],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}

