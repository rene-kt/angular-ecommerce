import { UpdatedClient } from './../models/updated/client-updated';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/users/local-user';
import { Client } from '../models/users/client';
import { StorageServiceService } from './storage-service.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService
  ) {}

  userStorage = {} as LocalUser;
  apiUrl = 'https://renejr-ecommerce.herokuapp.com';
  products: Product[];

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser().token,
    }),
  };
  returnUnsoldProducts(): Promise<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl + '/products', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.products = res));
  }

  updateClient(client: UpdatedClient){
    return this.httpClient.put<any>(this.apiUrl + '/update/client',client, this.httpAuthorization);
  }
}
