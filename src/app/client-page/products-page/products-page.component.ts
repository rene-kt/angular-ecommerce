import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from 'src/app/services/product-service.service.';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private productService: ProductServiceService) {}
  products: Product[];
  isLoading = true;

  ngOnInit(): void {

    this.productService.returnUnsoldProducts().then(()=>{
      this.products = this.productService.products;
      this.isLoading = false;
    })

  }

  

  openBuyDialog(productName: string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {


      if(result){
        this.buyProduct(productName, 'Dismiss');
      }
    });
  
  }

    buyProduct(productName: string, action: string) {
      this._snackBar.open(
        'You have bought the product |' + productName + '|' + 
        " We're sending a confirmation email to your inbox",
        action,
  
        {
          duration: 5000,
        }
      );
    }
  

  removeProductFromWishlist(){
    console.log('deu certo');
  }


  // parametro com o produto para mostrar o nome
  addProductInYourWishlistAndShowSnackbar(productName: string, action: string) {
    let snackBarRef = this._snackBar.open(
      'You have added the product |' + productName + '| in your wishlist ',
      action,

      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(()=> this.removeProductFromWishlist());
  }

}
