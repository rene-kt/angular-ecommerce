import { ProductDTO } from './../models/productDTO';
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
  ownProducts: Product[];
  productThatIsGoingToBeEdited ={} as Product;

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
    }),
  };
  async returnUnsoldProducts(): Promise<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl + '/products', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.products = res));
  }

  async returnOwnProducts(): Promise<Product[]> {

    let httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
    }),
  };

    return this.httpClient
      .get<Product[]>(this.apiUrl + '/ownproducts', httpAuthorization)
      .toPromise()
      .then((res) => (this.ownProducts = res));
  }

  createProduct(product: ProductDTO){

    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
      }),
    };
    
    return this.httpClient.post<any>(`${this.apiUrl}/product`, product, httpAuthorization)
  }

  updateProduct(product: ProductDTO, productId: string){

    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
      }),
    };
    
    return this.httpClient.put<any>(`${this.apiUrl}/product/${productId}`, product, httpAuthorization)
  }
  buyProduct(productId : string){
    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
      }),
    };
    
    return this.httpClient.put<any>(`${this.apiUrl}/buy/${productId}`, null, httpAuthorization)
  }

  removeProduct(productId : string){
    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
      }),
    };
    
    return this.httpClient.delete<any>(`${this.apiUrl}/product/${productId}`, httpAuthorization);
  }

   


  
}
