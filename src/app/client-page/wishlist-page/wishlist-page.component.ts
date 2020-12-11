import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
