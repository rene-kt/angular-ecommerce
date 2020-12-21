import { ProductDTO } from './../../../models/productDTO';
import { CreateProductDialogComponent } from './../../dialogs/create-product-dialog/create-product-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from 'src/app/services/product-service.service.';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditProductDialogComponent } from '../../dialogs/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponentSeller implements OnInit {
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private productService: ProductServiceService) {}
  products: Product[];
  isLoading = true;
  productDTO = {} as ProductDTO;
  selectedValue: string;

  ngOnInit(): void {

    this._getOwnProducts();
  }

  _getOwnProducts(){
    this.productService.returnOwnProducts().then(() =>{
      this.products = this.productService.ownProducts;
      this.isLoading = false;
    })
  }
  selectOrder(){

    switch (this.selectedValue) {
      case 'price':
        this._orderByPrice();
        break;
      
      case 'name':
        this._orderByName();
        break;
      
      case 'unsold':
        this._orderByUnsold();
        break;
    
    }

  
  }
  _orderByPrice(){
    this.products = this.products.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0)); 
  }

  _orderByName(){
    this.products = this.products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 

  }

  
  _orderByUnsold(){
    this.products = this.products.sort((a,b) => (a.hasBeenSold > b.hasBeenSold) ? -1 : ((b.hasBeenSold > a.hasBeenSold) ? 1 : 0)); 

  }
  

  openSaveDialog(){
    const dialogRef = this.dialog.open(CreateProductDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._getOwnProducts();
        this.showSnackBarProductCreated('Dismiss');
      }
    });
  }
  openRemoveDialog(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.removeProduct(product.id).subscribe(() =>{

          this._getOwnProducts();
          this.showSnackBarProductRemoved(product, 'Undo');
        })
      }
    });
  }

  openEditDialog(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent);
    this.productService.productThatIsGoingToBeEdited = product;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._getOwnProducts();
        this.showSnackBarProductEdited(product, 'Undo');
      }
    }, (err)=>{
        console.log('error' +err);
    });
  }

  showSnackBarProductCreated(action: string) {
    this._snackBar.open(
      'You have created a new product',
      action,

      {
        duration: 3000,
      }
    );
  }

  showSnackBarProductEdited(product: Product, action: string) {
    let snackBarRef = this._snackBar.open(
      'You have edited the product |' + product.name + '|',
      action,

      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(()=> this.undoTheEditAction(product));
  }


  undoTheEditAction(product: Product){
    this.productDTO.name = product.name;
    this.productDTO.price = product.price;
    this.productDTO.description = product.description;


    this.productService.updateProduct(this.productDTO, product.id).subscribe(() =>{
      this._getOwnProducts();
    })
  }

  undoTheRemoveAction(product: Product){
    this.productDTO.name = product.name;
    this.productDTO.price = product.price;
    this.productDTO.description = product.description;


    this.productService.createProduct(this.productDTO).subscribe(() =>{
      this.showSnackBarProductCreated('Dismiss');
      this._getOwnProducts();
    })
  }

  showSnackBarProductRemoved(product: Product, action: string) {
    let snackBarRef = this._snackBar.open(
      'You have removed the product |' + product.name + '|',
      action,

      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(()=> this.undoTheRemoveAction(product));
  }

  showSnackBarProductHasBeenSold(action: string) {
    this._snackBar.open(
      'You can do that because the product has already been sold',
      action,

      {
        duration: 3000,
      }
    );
  }

}
