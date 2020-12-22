import { Router } from '@angular/router';
import { StorageServiceService } from './../../../services/storage-service.service';

import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Client } from 'src/app/models/users/client';
import { UserRanking } from 'src/app/models/users/user-ranking';
import { RankingServerService } from 'src/app/services/ranking-server.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private clientService: ClientServiceService,
    private rankingService: RankingServerService,
    private storageService: StorageServiceService,
    private router: Router
  ) {}

  client = {} as Client;
  isLoading = true;
  isLoadingRanking = true;
  rankingClients: UserRanking[];
  rankingSeller: UserRanking[];

  ngOnInit(): void {
    
    this._returnClientLogged();
    this._returnClientRanking();
    this._returnSellerRanking();
  }

  

  _returnClientLogged() {
    this.clientService.returnClient().then(() => {
      this.client = this.clientService.client;
      this.isLoading = false;
    });
  }
  _returnClientRanking() {
    this.rankingService.returnRankingClient().then(() => {
      this.rankingClients = this.rankingService.rankingClient;
      this.isLoadingRanking = false;
    });
  }
  _returnSellerRanking() {
    this.rankingService.returnRankingSeller().then(() => {
      this.rankingSeller = this.rankingService.rankingSeller;
      this.isLoadingRanking = false;
    });
  }
}
