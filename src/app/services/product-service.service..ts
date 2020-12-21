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
      Authorization: 'Bearer ' + this.storage.getLocalUser().token,
    }),
  };
  async returnUnsoldProducts(): Promise<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl + '/products', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.products = res));
  }

  async returnOwnProducts(): Promise<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl + '/ownproducts', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.ownProducts = res));
  }

  createProduct(product: ProductDTO){
    return this.httpClient.post<any>(`${this.apiUrl}/product`, product, this.httpAuthorization)
  }

  updateProduct(product: ProductDTO, productId: string){
    return this.httpClient.put<any>(`${this.apiUrl}/product/${productId}`, product, this.httpAuthorization)
  }
  buyProduct(productId : string){
    return this.httpClient.put<any>(`${this.apiUrl}/buy/${productId}`, null, this.httpAuthorization)
  }

  removeProduct(productId : string){
    return this.httpClient.delete<any>(`${this.apiUrl}/product/${productId}`, this.httpAuthorization);
  }

   


  
}
