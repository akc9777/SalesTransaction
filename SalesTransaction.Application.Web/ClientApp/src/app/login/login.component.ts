import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitHandler() {

    if (this.loginForm.valid) {
      this.login.username = this.loginForm.get('username').value.trim();
      this.login.password = this.loginForm.get('password').value.trim();

      this.loginService.getLogin(this.login).subscribe((response: any) => {
        if (response) {
          this.openSnackBar('Login Success!', 'success');
          this.router.navigate(['/user-detail']);
        } else {
          this.openSnackBar('Something went wrong', '');
        }
      });
    } else {
      this.openSnackBar('Invalid form check your detail', '');
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: [action],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}

