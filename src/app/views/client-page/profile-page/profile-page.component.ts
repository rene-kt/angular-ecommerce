import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdatedClient } from './../../models/updated/client-updated';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/users/client';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

    selectedValue = 'Client';
  // hide password
  hide = true;
  client = {} as Client;
  updatedClient = {} as UpdatedClient;

  

  formGroup = new FormGroup({
    name: new FormControl('' ) ,
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private clientService: ClientServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.client = this.clientService.client;
    this._populateForm();
   
  }
  _populateForm(){
    this.formGroup.patchValue({
      name: this.client.name,
      email: this.client.email,
      password: this.client.password,
    })
  }
  update(){
    this.updatedClient.name = this.formGroup.value.name;
    this.updatedClient.email = this.formGroup.value.email;
    this.updatedClient.password = this.formGroup.value.password;

    this.clientService.updateClient(this.updatedClient).subscribe(() =>{
      this.confirmationEdit();
    }, (err) =>{
      this.formGroup.controls['email'].setErrors({ incorrect: true });
      this.errorEdit();
      console.log(err);
    })

  }

  confirmationEdit() {
    this._snackBar.open(
      'Your profile was edited',
      'Dismiss',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  
  errorEdit() {
    this._snackBar.open(
      'This email is already being used',
      'Dismiss',

      {
        duration: 5000,
        panelClass: ['purple-snackbar'],
      }
    );
  }

  

  

 

}
