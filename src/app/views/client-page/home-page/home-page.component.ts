import { UserRanking } from './../../models/users/user-ranking';
import { RankingServerService } from './../../services/ranking-server.service';
import { Client } from './../../models/users/client';
import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Seller } from 'src/app/models/users/seller';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private clientService: ClientServiceService,
    private rankingService: RankingServerService
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
