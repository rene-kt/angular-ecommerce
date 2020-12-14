import { SignComponentComponent } from './../sign-component/sign-component.component';
import { Router } from '@angular/router';
import { StorageServiceService } from './storage-service.service';
import { SignUpUser } from './../models/users/signup-user';
import { LoginUser } from './../models/users/login-user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local-user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SignServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  apiUrl = 'https://renejr-ecommerce.herokuapp.com';
  userStorage = {} as LocalUser;
  signComponent: SignComponentComponent;

  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService,
    private router: Router
  ) {}

  login(user: LoginUser) {
    this.httpClient
      .post<any>(this.apiUrl + '/login', JSON.stringify(user), {
        observe: 'response',
      })
      .subscribe((resp) => {
        this._getTokenFromHeaders(resp.headers.get('Authorization'));
      },(err) =>{
        console.log('entrou');
        this.handleError(err);
      }
      )
  }

  _getTokenFromHeaders(tokenFromRequest: string) {
    this.userStorage.token = tokenFromRequest.substring(7);
    const decodedToken = jwt_decode(this.userStorage.token);
    this.userStorage.email = decodedToken['sub'];

    
    this.storage.setLocalUser(this.userStorage);
  }

  signUpSeller(seller: SignUpUser) {
    return this.httpClient.post<any>(
      this.apiUrl + '/create/seller',
      JSON.stringify(seller),
      this.httpOptions
    );
  }
  signUpClient(client: SignUpUser) {
    return this.httpClient.post<any>(
      this.apiUrl + '/create/client',
      JSON.stringify(client),
      this.httpOptions
    );
  }

  handleError(error: HttpErrorResponse){  
    if(error.status == 401)  {

    }
  }
}
