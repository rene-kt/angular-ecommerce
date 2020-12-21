import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from 'src/app/services/product-service.service.';
import { WishlistServiceService } from 'src/app/services/wishlist-service.service';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private wishlistService: WishlistServiceService,
    private productService: ProductServiceService
  ) {}
  products: Product[];
  isLoading = true;
  selectedValue: string;

  ngOnInit(): void {
    this._getProducts();
  }

  _getProducts() {
    this.isLoading = true;
    this.productService.returnUnsoldProducts().then(() => {
      this.products = this.productService.products;
      this.isLoading = false;
    });
  }

  selectOrder() {
    switch (this.selectedValue) {
      case 'price':
        this._orderByPrice();
        break;

      case 'name':
        this._orderByName();
        break;
    }
  }
  _orderByPrice() {
    this.products = this.products.sort((a, b) =>
      a.price > b.price ? -1 : b.price > a.price ? 1 : 0
    );
  }

  _orderByName() {
    this.products = this.products.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  openBuyDialog(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.buyProduct(product.id).subscribe(() => {
          this.showSnackBaProductBought(product.name, 'Dismiss');
          this._getProducts();
        });
      }
    });
  }

  showSnackBaProductBought(productName: string, action: string) {
    this._snackBar.open(
      'You have bought the product |' +
        productName +
        '|' +
        " We're sending a confirmation email to your inbox",
      action,

      {
        duration: 5000,
      }
    );
  }

  removeProductFromWishlist(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId);
  }

  addProductWishlist(product: Product) {
    this.wishlistService.addProductInWishlist(product.id).subscribe(
      () => {
        this.showSnackBarProductSetAsWished(product, 'Undo');
      },
      (err) => {
        if (err.status === 400) {
          this.showSnackBarYouHaveAlreadySetThisProductAsWished(
            product.name,
            'Dismiss'
          );
        }
      }
    );
  }

  showSnackBarYouHaveAlreadySetThisProductAsWished(
    productName: string,
    action: string
  ) {
    this._snackBar.open(
      'The product: |' + productName + '| is already in your wishlist ',
      action,

      {
        duration: 3000,
      }
    );
  }

  // parametro com o produto para mostrar o nome
  showSnackBarProductSetAsWished(product: Product, action: string) {
    let snackBarRef = this._snackBar.open(
      'You have added the product |' + product.name + '| in your wishlist ',
      action,

      {
        duration: 3000,
      }
    );
    snackBarRef
      .onAction()
      .subscribe(() => this.removeProductFromWishlist(product.id));
  }
}
