import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SignComponentComponent } from './views/sign-component/sign-component.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientPageComponent } from './views/client-page/client-page.component';
import { HomePageComponent } from './views/client-page/home-page/home-page.component';
import { OrderPageComponent } from './views/client-page/order-page/order-page.component';
import { ProductsPageComponent } from './views/client-page/products-page/products-page.component';
import { ProfilePageComponent } from './views/client-page/profile-page/profile-page.component';
import { WishlistPageComponent } from './views/client-page/wishlist-page/wishlist-page.component';
import { ConfirmationDialogComponent } from './views/dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditProductDialogComponent } from './views/dialogs/edit-product-dialog/edit-product-dialog.component';
import { HomePageComponentSeller } from './views/seller-page/home-page/home-page.component';
import { ProductsPageComponentSeller } from './views/seller-page/products-page/products-page.component';
import { ProfilePageComponentSeller } from './views/seller-page/profile-page/profile-page.component';
import { SellerPageComponent } from './views/seller-page/seller-page.component';
import { SellsPageComponent } from './views/seller-page/sells-page/sells-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    SellerPageComponent,
    SignComponentComponent,
    HomePageComponent,
    HomePageComponentSeller,
    ProductsPageComponent,
    ProductsPageComponentSeller,
    WishlistPageComponent,
    OrderPageComponent,
    ProfilePageComponent,
    ProfilePageComponentSeller,
    SellsPageComponent,
    ConfirmationDialogComponent,
    EditProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      {
        path: 'client-page',
        component: ClientPageComponent,
        children: [
          { path: 'home', component: HomePageComponent },
          { path: 'products', component: ProductsPageComponent },
          { path: 'wishlist', component: WishlistPageComponent },
          { path: 'profile', component: ProfilePageComponent },
          { path: 'orders', component: OrderPageComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
      {
        path: 'seller-page',
        component: SellerPageComponent,
        children: [
          { path: 'home', component: HomePageComponentSeller },
          { path: 'profile', component: ProfilePageComponentSeller },
          { path: 'products', component: ProductsPageComponentSeller },
          { path: 'sells', component: SellsPageComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
      },
      { path: 'sign-page', component: SignComponentComponent },
      { path: '', redirectTo: '/sign-page', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
