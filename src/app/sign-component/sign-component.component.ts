import { EmailDTO } from './../models/emailDTO';
import { StorageServiceService } from './../services/storage-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpUser } from './../models/users/signup-user';
import { SignServiceService } from './../services/sign-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginUser } from '../models/users/login-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-component',
  templateUrl: './sign-component.component.html',
  styleUrls: ['./sign-component.component.css'],
})
export class SignComponentComponent implements OnInit {
  constructor(
    private signService: SignServiceService,
    private _snackBar: MatSnackBar,
    private storage: StorageServiceService,
  ) {}

  selectedValue: string;
  // hide password
  hide = true;
  check = true;
  signUpUser = {} as SignUpUser;
  isLoading = false;
  loginUser = {} as LoginUser;
  emailDTO = {} as EmailDTO;
  emailIsInvalid = true;

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
        this.clearFieldsSignUp();

      },
      (error) => {
        this.duplicateEmail();
        this.isLoading = false;
      }
    );
  }
  signUpAsClient() {
    this.signService.signUpClient(this.signUpUser).subscribe(
      () => {
        this.isLoading = false;
        this.confirmationSignUp();
        this.clearFieldsSignUp();
      },
      (error) => {
        this.duplicateEmail();
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

  duplicateEmail() {
    this.signUpForm.controls['email'].setErrors({ incorrect: true });
    this.errorSignUp();
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


  clearFieldsSignUp() {
    this.signUpForm.reset();
    this.signUpForm.clearValidators();
  }

  login() {
    this.isLoading = true;
    this.parseFormInfoIntoLoginObject();

    this.signService.login(this.loginUser).subscribe(
      (data) => this.signService.userStorageFromToken(data.headers.get('Authorization')),
      (error) => this.emailOrPasswordIncorrect()
    );
    this.isLoading = false;
  }

  emailOrPasswordIncorrect() {
    this.loginForm.controls['email'].setErrors({ incorrect: true });
    this.loginForm.controls['password'].setErrors({ incorrect: true });
    this.snackBarErrorLogin();
  }

  snackBarErrorLogin() {
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
    
    this.isLoading = true;
    this.emailDTO.email = this.loginForm.value.email;
    this.signService.forgotPassword(this.emailDTO).subscribe(() => {
      this.isLoading = false;
      this.snackBarEmailSent();
    })
  }

 

  snackBarEmailSent() {
    this._snackBar.open(
      'A new password is being sent to your email. Please, check your mail out in a few seconds',
      'I got it',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  ngOnInit(): void {
    this.storage.logout();
  }
}
