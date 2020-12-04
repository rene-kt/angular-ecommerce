import { Component, OnInit } from '@angular/core';

interface Type {
  name: string;
}

@Component({
  selector: 'app-sign-component',
  templateUrl: './sign-component.component.html',
  styleUrls: ['./sign-component.component.css'],
})
export class SignComponentComponent implements OnInit {
  selectedValue = 'Client';
  // hide password
  hide = true;
  check = true;

  types: Type[] = [{ name: 'Client' }, { name: 'Seller' }];


  constructor() {}

  ngOnInit(): void {}
}
