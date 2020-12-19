import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/models/users/seller';
import { UserRanking } from 'src/app/models/users/user-ranking';
import { RankingServerService } from 'src/app/services/ranking-server.service';
import { SellerServiceService } from 'src/app/services/seller-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponentSeller implements OnInit {

  constructor(
    private sellerService: SellerServiceService,
    private rankingService: RankingServerService
  ) {}

  seller = {} as Seller;
  isLoading = true;
  isLoadingRanking = true;
  rankingClients: UserRanking[];
  rankingSeller: UserRanking[];

  ngOnInit(): void {
    this._returnSellerLogged();
    this._returnClientRanking();
    this._returnSellerRanking();
  }

  _returnSellerLogged() {
    this.sellerService.returnSeller().then(() => {
      this.seller = this.sellerService.seller;
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
