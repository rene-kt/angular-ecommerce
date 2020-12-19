import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageServiceService } from './storage-service.service';
import { Product } from '../models/product';
import { GlobalAPI } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService
  ) {}

  apiUrl = GlobalAPI.apiUrl;

  products: Product[];

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser().token,
    }),
  };
  async returnUnsoldProducts(): Promise<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl + '/products', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.products = res));
  }


  buyProduct(productId : string){
    return this.httpClient.put<any>(`${this.apiUrl}/buy/${productId}`, null, this.httpAuthorization)
  }

   


  
}
