import { UpdatedUser } from './../models/updated/user-updated';
import { Seller } from './../models/users/seller';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/users/local-user';
import { StorageServiceService } from './storage-service.service';
import { GlobalAPI } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SellerServiceService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService
  ) {}

  userStorage = {} as LocalUser;
  apiUrl = GlobalAPI.apiUrl;
  seller = {} as Seller;

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
    }),
  };
  async returnSeller(): Promise<Seller> {
    return this.httpClient
      .get<Seller>(this.apiUrl + '/seller', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.seller = res));
  }

  updateSeller(seller: UpdatedUser){
    return this.httpClient.put<any>(this.apiUrl + '/update/seller',seller, this.httpAuthorization);
  }
}
