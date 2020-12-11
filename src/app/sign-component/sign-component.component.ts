import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  types: Type[] = [{ name: 'Client' }, { name: 'Seller' }];

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    cpf: new FormControl(''),
    password: new FormControl('')
  })

  signUp(){
    console.log('deu certo sign up');
      console.warn(this.signUpForm.value);

  }

  login(){
    console.log('deu certo');
  }

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  
  


  clearFieldsSignUp(){
    this.signUpForm.reset();
  }
  
  forgotPassword(email: string){
    console.log(email);
  }
  constructor() {}

  
  ngOnInit(): void {}
}

