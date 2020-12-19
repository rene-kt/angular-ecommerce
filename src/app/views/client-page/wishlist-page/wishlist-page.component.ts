import { ProductServiceService } from 'src/app/services/product-service.service.';
import { WishlistServiceService } from './../../services/wishlist-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog,private productService: ProductServiceService, private wishlistService: WishlistServiceService) { }

  wishlist: Product[];
  selectedValue: string;
  ngOnInit(): void {

    this._getWishlist();
  }


  _getWishlist(){
    this.wishlistService.returnWishlist().then(() =>{
      this.wishlist = this.wishlistService.wishlist;
    })

  }


  selectOrder(){
    if(this.selectedValue==='price'){
      this._orderByPrice();
    }else if(this.selectedValue === 'name'){
      this._orderByName();
    }
  }
  _orderByPrice(){
    this.wishlist = this.wishlist.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0)); 
  }

  _orderByName(){
    this.wishlist = this.wishlist.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 

  }

  



  openBuyDialog(product: Product){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.productService.buyProduct(product.id).subscribe(() =>{
          this.showSnackBarProductBought(product.name, 'Dismiss');
          this._getWishlist();
        })
      }
    });
  
  }

    showSnackBarProductBought(productName: string, action: string) {
      this._snackBar.open(
        'You have bought the product |' + productName + '|' + 
        " We're sending a confirmation email to your inbox",
        action,
        
  
        {
          duration: 5000,
        }
      );
    }

  addProductInYourWishlist(product: Product){
    this.wishlistService.addProductInWishlist(product.id).subscribe(() =>{
      this.showSnackBarProductAddedAgain(product, 'Dismiss');
      this._getWishlist();
    })
  }

  removeProductFromWishlist(product: Product){
    this.wishlistService.removeProductFromWishlist(product.id).subscribe(() =>{
      this.showSnackBarProductRemoved(product, 'Undo');
      this._getWishlist();

    })
  }

  showSnackBarProductAddedAgain(product: Product, action: string) {
   this._snackBar.open(
      'Added the product:|' + product.name + '| in your wishlist again',
      action,

      {
        duration: 3000,
      }
    );
  }

  showSnackBarProductRemoved(product: Product, action: string) {
    let snackBarRef = this._snackBar.open(
      'You have removed the product |' + product.name + '| from your wishlist ',
      action,

      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(()=> this.addProductInYourWishlist(product));
  }

}
