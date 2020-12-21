import { ProductServiceService } from './../../../services/product-service.service.';
import { ProductDTO } from './../../../models/productDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {

  productDTO = {} as ProductDTO;
  productThatIsGoingToBeEdited = {} as Product;

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.productThatIsGoingToBeEdited = this.productService.productThatIsGoingToBeEdited;

    this._populateForm();
  }

   editForm = new FormGroup({
    name: new FormControl(''),
    desc: new FormControl(''),
    price: new FormControl(''),
  })

  _populateForm(){
    this.editForm.patchValue({
      name: this.productThatIsGoingToBeEdited.name,
      price: this.productThatIsGoingToBeEdited.price,
      desc: this.productThatIsGoingToBeEdited.description,
    })
  }


  edit(){

    this.productDTO.name = this.editForm.value.name;
    this.productDTO.price = this.editForm.value.price;
    this.productDTO.description = this.editForm.value.desc;

    this.productService.updateProduct(this.productDTO, this.productThatIsGoingToBeEdited.id).subscribe(() =>{
      console.log('success');
    }, (err)=>{
      console.log(err);
    })
  }
}
