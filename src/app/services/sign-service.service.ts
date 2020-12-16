import { Router } from '@angular/router';
import { StorageServiceService } from './storage-service.service';
import { SignUpUser } from './../models/users/signup-user';
import { LoginUser } from './../models/users/login-user';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local-user';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class SignServiceService {
  apiUrl = 'https://renejr-ecommerce.herokuapp.com';
  userStorage = {} as LocalUser;
  type: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService,
    private router: Router,
  ) {}

  login(user: LoginUser): any {
    return this.httpClient
      .post<any>(this.apiUrl + '/login', JSON.stringify(user), {
        observe: 'response',
      })
     
  }

  userStorageFromToken(tokenFromRequest: string) {
    this.userStorage.token = tokenFromRequest.substring(7);
    const decodedToken = jwt_decode(this.userStorage.token);
    this.userStorage.email = decodedToken['sub'];

    this.storage.setLocalUser(this.userStorage);
    this.returnUserType();
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

  returnUserType(): any {
    let type: string;
    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userStorage.token,
      }),
    };

    this.httpClient
      .get(this.apiUrl + '/user', httpAuthorization)
      .subscribe((res) => {
        type = res['type'];

        if (type === 'Client') {
          this.router.navigateByUrl('/client-page');
        } else if (type === 'Seller') {
          this.router.navigateByUrl('/seller-page');
        }
      });
  }

}
