import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
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
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {}

  products: Product[] = [
    {
      name: 'Photos',
    },
    {
      name: 'Recipes',
    },
  ];


  openRemoveDialog(){
  }

  undoRemove(){
    console.log('deu certo');
  }


  // parametro com o produto para mostrar o nome
  removeProduct(productName: string, action: string) {
    let snackBarRef = this._snackBar.open(
      'You have removed the product |' + productName + '| ',
      action,

      {
        duration: 3000,
      }
    );
    snackBarRef.onAction().subscribe(()=> this.undoRemove());
  }

}
