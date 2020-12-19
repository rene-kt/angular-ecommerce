import { Order } from './../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageServiceService } from './storage-service.service';
import { Product } from '../models/product';
import { GlobalAPI } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService
  ) {}

  apiUrl = GlobalAPI.apiUrl;

  orders: Order[];

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser().token,
    }),
  };
  async returnOrders(): Promise<Order[]> {
    return this.httpClient
      .get<Order[]>(this.apiUrl + '/client/orders', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.orders = res));
  }



  
}
