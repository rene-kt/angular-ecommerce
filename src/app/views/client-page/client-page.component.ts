import { StorageServiceService } from './../../services/storage-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {

  constructor(private storage: StorageServiceService) { }

  ngOnInit(): void {
    this.storage.theresAnyUserLogged();
  }

  

}
