import { Client } from './../../models/users/client';
import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private clientService: ClientServiceService) {}

  client = {} as Client;
  isLoading = true;

  ngOnInit(): void {
    this.clientService.returnClient().then(() =>{
      console.log(this.clientService.client);
      this.client = this.clientService.client;
      this.isLoading = false;
    })


  }



 
}
