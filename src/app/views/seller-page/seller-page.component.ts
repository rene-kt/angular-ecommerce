import { StorageServiceService } from './../../services/storage-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {

  constructor(private storage: StorageServiceService) { }

  ngOnInit(): void {
    this.storage.theresAnyUserLogged();
  }


  logout(){
    this.storage.logout();
  }

}
