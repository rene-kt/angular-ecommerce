import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
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

  addProductInYourWishlist(){
    console.log('deu certo');
  }
  removeProductInYourWishlistAndShowSnackbar(productName: string, action: string) {
    let snackBarRef = this._snackBar.open(
      'You have removed the product |' + productName + '| from your wishlist ',
      action,

      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(()=> this.addProductInYourWishlist());
  }

}
