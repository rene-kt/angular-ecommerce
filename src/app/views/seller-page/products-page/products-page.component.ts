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

  ngOnInit(): void {

    this._getOwnProducts();
  }

  _getOwnProducts(){
    this.productService.returnOwnProducts().then(() =>{
      this.products = this.productService.ownProducts;
      this.isLoading = false;
    })
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

  openEditDialog(productName: string) {
    const dialogRef = this.dialog.open(EditProductDialogComponent);

    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSnackBarProductEdited(productName, 'Dismiss');
      }
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

  showSnackBarProductEdited(productName: string, action: string) {
    this._snackBar.open(
      'You have edited the product |' + productName + '| ',
      action,

      {
        duration: 3000,
      }
    );
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

}
