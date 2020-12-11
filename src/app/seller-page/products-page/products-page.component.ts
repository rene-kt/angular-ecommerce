import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Product {
  name: string;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponentSeller implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  products: Product[] = [
    {
      name: 'Photos',
    },
    {
      name: 'Recipes',
    },
  ];

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
