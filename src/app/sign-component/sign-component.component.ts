import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpUser } from './../models/users/signup-user';
import { Client } from './../models/users/client';
import { SignServiceService } from './../services/sign-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import { HttpErrorResponse } from '@angular/common/http';

interface Type {
  name: string;
}

@Component({
  selector: 'app-sign-component',
  templateUrl: './sign-component.component.html',
  styleUrls: ['./sign-component.component.css'],
})
export class SignComponentComponent implements OnInit {
  selectedValue = 'Client';
  // hide password
  hide = true;
  check = true;
  signUpUser = {} as SignUpUser;
  isLoading = false;

  types: Type[] = [{ name: 'Client' }, { name: 'Seller' }];

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    cpf: new FormControl(''),
    password: new FormControl('')
  })

  signUp(){

      this.isLoading = true;
    if(this.selectedValue === 'Client'){
      this.signUpUser.name = this.signUpForm.value.name;
      this.signUpUser.cpf = this.signUpForm.value.cpf;
      this.signUpUser.email = this.signUpForm.value.email;
      this.signUpUser.password = this.signUpForm.value.password;


      this.signService.signUpClient(this.signUpUser).subscribe(() => {
        this.isLoading = false;
        this.confirmationSignUp();
      },(error) =>{
        this.invalidForm();
        this.isLoading = false;
      }
      

      );

    }else{
      console.log(' n entrou o client, entrou:' + this.selectedValue);
    }

  }

  login(){
    console.log('deu certo');
  }

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  
  
  confirmationSignUp() {
    this._snackBar.open(
      'Your profile was created',
      'Dismiss',

      {
        duration: 3000,
      }
    );
  }

  errorSignUp() {
    this._snackBar.open(
      'This email/cpf are being used by other user',
      'I got it',


      {
        duration: 10000,
          panelClass: ['purple-snackbar']

      }
    );
  }

  invalidForm(){
    this.signUpForm.controls['email'].setErrors({'incorrect': true});
    this.signUpForm.controls['cpf'].setErrors({'incorrect': true});
    this.errorSignUp();
  }


  clearFieldsSignUp(){
    this.signUpForm.reset();
  }
  
  forgotPassword(){
    console.log(this.signInForm.value.email);
  }
  constructor(private signService: SignServiceService, private _snackBar: MatSnackBar) {}

  
  ngOnInit(): void {}
}

