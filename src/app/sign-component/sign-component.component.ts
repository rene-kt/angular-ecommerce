import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-component',
  templateUrl: './sign-component.component.html',
  styleUrls: ['./sign-component.component.css']
})
export class SignComponentComponent implements OnInit {
  selectedValue: string;
  // hide password
  hide = true;


  login(): void{

  }

  constructor() { }

  ngOnInit(): void {
  }

}
