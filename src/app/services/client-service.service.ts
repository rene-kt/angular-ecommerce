import { UpdatedClient } from './../models/updated/client-updated';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/users/local-user';
import { Client } from '../models/users/client';
import { StorageServiceService } from './storage-service.service';
import { GlobalAPI } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService
  ) {}

  userStorage = {} as LocalUser;
  apiUrl = GlobalAPI.apiUrl;
  client = {} as Client;

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser().token,
    }),
  };
  returnClient(): Promise<Client> {
    return this.httpClient
      .get<Client>(this.apiUrl + '/client', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.client = res));
  }

  updateClient(client: UpdatedClient){
    return this.httpClient.put<any>(this.apiUrl + '/update/client',client, this.httpAuthorization);
  }
}
