import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductServiceService } from 'src/app/services/product-service.service.';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditProductDialogComponent } from '../../dialogs/edit-product-dialog/edit-product-dialog.component';

export interface Product {
  name: string;
}

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponentSeller implements OnInit {
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private productService: ProductServiceService) {}
  products: Product[];
  isLoading = true;

  ngOnInit(): void {

  
  }


  openRemoveDialog(productName: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeProduct(productName, 'Dismiss');
      }
    });
  }

  openEditDialog(productName: string) {
    const dialogRef = this.dialog.open(EditProductDialogComponent);

    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editProduct(productName, 'Dismiss');
      }
    });
  }

  editProduct(productName: string, action: string) {
    this._snackBar.open(
      'You have edited the product |' + productName + '| ',
      action,

      {
        duration: 3000,
      }
    );
  }

  removeProduct(productName: string, action: string) {
    this._snackBar.open(
      'You have removed the product |' + productName + '| ',
      action,

      {
        duration: 3000,
      }
    );
  }
}