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

  

    addProductInWishlist(productId: string) {
      let httpAuthorization = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
        }),
      };
      
    return this.httpClient
      .post<any>(`${this.apiUrl}/wishlist/${productId}`, null, httpAuthorization);
      
  }

  removeProductFromWishlist(productId: string){
    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
      }),
    };
    
    return this.httpClient.delete<any>(`${this.apiUrl}/wishlist/${productId}`,httpAuthorization);
  }

  async returnWishlist(): Promise<Product[]> {
    let httpAuthorization = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
      }),
    };
    
    return this.httpClient
      .get<Product[]>(this.apiUrl + '/wishlist', httpAuthorization)
      .toPromise()
      .then((res) => (this.wishlist = res));
  }

  
}
