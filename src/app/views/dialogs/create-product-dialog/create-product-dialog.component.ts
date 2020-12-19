import { ProductServiceService } from 'src/app/services/product-service.service.';
import { ProductDTO } from './../../../models/productDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.css']
})
export class CreateProductDialogComponent implements OnInit {

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
  }

  product = {} as ProductDTO;


  
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(''),
    description: new FormControl('', Validators.required),
  });

  addNewProduct(){
    this.product.name = this.productForm.value.name;
    this.product.price = this.productForm.value.price;
    this.product.description = this.productForm.value.description;

    this.productService.createProduct(this.product);
  }

}
