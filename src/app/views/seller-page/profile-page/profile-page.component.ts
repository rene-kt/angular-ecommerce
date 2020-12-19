import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdatedUser } from 'src/app/models/updated/user-updated';
import { Seller } from 'src/app/models/users/seller';
import { SellerServiceService } from 'src/app/services/seller-service.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponentSeller implements OnInit {

  selectedValue = 'Client';
  // hide password
  hide = true;
  seller = {} as Seller;
  updatedSeller = {} as UpdatedUser;

  

  formGroup = new FormGroup({
    name: new FormControl('' ) ,
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private sellerService: SellerServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.seller = this.sellerService.seller;
    this._populateForm();
   
  }
  _populateForm(){
    this.formGroup.patchValue({
      name: this.seller.name,
      email: this.seller.email,
      password: this.seller.password,
    })
  }
  update(){
    this.updatedSeller.name = this.formGroup.value.name;
    this.updatedSeller.email = this.formGroup.value.email;
    this.updatedSeller.password = this.formGroup.value.password;

    this.sellerService.updateSeller(this.updatedSeller).subscribe(() =>{
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
