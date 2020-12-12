import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   editForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl(''),
    price: new FormControl(''),
  })


  edit(){
    console.log(this.editForm.value);
  }
}
