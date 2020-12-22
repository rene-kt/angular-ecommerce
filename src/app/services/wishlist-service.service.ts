import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageServiceService } from './storage-service.service';
import { Product } from '../models/product';
import { GlobalAPI } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistServiceService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService
  ) {}

  apiUrl = GlobalAPI.apiUrl;
  wishlist: Product[];

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
    }),
  };

    addProductInWishlist(productId: string) {

    return this.httpClient
      .post<any>(`${this.apiUrl}/wishlist/${productId}`, null, this.httpAuthorization);
      
  }

  removeProductFromWishlist(productId: string){
    return this.httpClient.delete<any>(`${this.apiUrl}/wishlist/${productId}`, this.httpAuthorization);
  }

  async returnWishlist(): Promise<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiUrl + '/wishlist', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.wishlist = res));
  }

  
}
