import { StorageServiceService } from './../services/storage-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpUser } from './../models/users/signup-user';
import { SignServiceService } from './../services/sign-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginUser } from '../models/users/login-user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-component',
  templateUrl: './sign-component.component.html',
  styleUrls: ['./sign-component.component.css'],
})
export class SignComponentComponent implements OnInit {
  constructor(
    private signService: SignServiceService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private storage: StorageServiceService
  ) {}

  selectedValue: string;
  // hide password
  hide = true;
  check = true;
  signUpUser = {} as SignUpUser;
  isLoading = false;
  loginUser = {} as LoginUser;

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });


  signUp() {
    this.isLoading = true;

    this.parseFormInfoIntoSignUpObject();

    if (this.selectedValue === 'client') {
      this.signUpAsClient();
    } else {
      this.signUpAsSeller();
    }
  }

  parseFormInfoIntoSignUpObject() {
    this.signUpUser.name = this.signUpForm.value.name;
    this.signUpUser.email = this.signUpForm.value.email;
    this.signUpUser.password = this.signUpForm.value.password;
  }
  signUpAsSeller() {
    this.signService.signUpSeller(this.signUpUser).subscribe(
      () => {
        this.isLoading = false;
        this.confirmationSignUp();
      },
      (error) => {
        this.invalidForm();
        this.isLoading = false;
      }
    );
  }
  signUpAsClient() {
    this.signService.signUpClient(this.signUpUser).subscribe(
      () => {
        this.isLoading = false;
        this.confirmationSignUp();
      },
      (error) => {
        this.invalidForm();
        this.isLoading = false;
      }
    );
  }

  confirmationSignUp() {
    this._snackBar.open(
      'Your profile was created',
      'Dismiss',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  errorSignUp() {
    this._snackBar.open(
      'This email is being used by other user',
      'I got it',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  invalidForm() {
    this.signUpForm.controls['email'].setErrors({ incorrect: true });
    this.errorSignUp();
  }

  clearFieldsSignUp() {
    this.signUpForm.reset();
  }

  login() {
    this.isLoading = true;
    this.parseFormInfoIntoLoginObject();

    switch (this.selectedValue) {
      case 'client':
        this.loginAsClient();

      case 'seller;':
    }
  }

  loginAsClient() {
   this.signService.login(this.loginUser);

    this.isLoading = false;
  }

  emailOrPasswordIncorrect() {
    this.loginForm.controls['email'].setErrors({ incorrect: true });
    this.loginForm.controls['password'].setErrors({ incorrect: true });
    this.errorLogin();
  }

  errorLogin() {
    this._snackBar.open(
      'Email or password incorrect',
      'I got it',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  parseFormInfoIntoLoginObject() {
    this.loginUser.email = this.loginForm.value.email;
    this.loginUser.password = this.loginForm.value.password;
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  forgotPassword() {
    console.log(this.loginForm.value.email);
  }

  ngOnInit(): void {
    this.storage.logout();
  }

 
     
}
