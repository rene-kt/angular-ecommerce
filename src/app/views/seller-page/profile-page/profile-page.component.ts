import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponentSeller implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedValue = 'Client';
  // hide password
  hide = true;


  formGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    cpf: new FormControl(''),
    password: new FormControl('')
  })

  

 


}
