import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/users/local-user';

import { StorageServiceService } from './storage-service.service';
import { UserRanking } from '../models/users/user-ranking';
import { GlobalAPI } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RankingServerService {

  constructor(
    private httpClient: HttpClient,
    private storage: StorageServiceService
  ) {}

  userStorage = {} as LocalUser;
  apiUrl = GlobalAPI.apiUrl;

  rankingClient: UserRanking[];
  rankingSeller: UserRanking[];

  httpAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getLocalUser()?.token,
    }),
  };

  returnRankingClient(): Promise<UserRanking[]> {

console.log(this.httpAuthorization.headers);

    return this.httpClient
      .get<UserRanking[]>(this.apiUrl + '/clients/ranking', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.rankingClient = res));
  }

  returnRankingSeller(): Promise<UserRanking[]> {
    return this.httpClient
      .get<UserRanking[]>(this.apiUrl + '/sellers/ranking', this.httpAuthorization)
      .toPromise()
      .then((res) => (this.rankingSeller = res));
  }
}
