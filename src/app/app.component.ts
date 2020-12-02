import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: string;
  title = 'angular-ecommerce';
  // hide password
  hide = true;


  login(): void{

  }
}
