import { SignUpUser } from './../models/users/signup-user';
import { LoginUser } from './../models/users/login-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  apiUrl = 'https://renejr-ecommerce.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  login(user: LoginUser){
    return this.httpClient.post<any>(
      this.apiUrl + '/login',
      JSON.stringify(user),
      this.httpOptions,
    ) 
  }

  signUpSeller(seller: SignUpUser){
    return this.httpClient.post<any>(
      this.apiUrl + '/create/seller',
      JSON.stringify(seller),
      this.httpOptions,
    ) 
  }
  signUpClient(client: SignUpUser){
    return this.httpClient.post<any>(
      this.apiUrl + '/create/client',
      JSON.stringify(client),
      this.httpOptions,
    ) 
  }
}
