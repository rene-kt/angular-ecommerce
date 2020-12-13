import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientPageComponent } from './client-page/client-page.component';
import { RouterModule } from '@angular/router';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { SignComponentComponent } from './sign-component/sign-component.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskModule } from 'ngx-mask';
import { HomePageComponent } from './client-page/home-page/home-page.component';
import { ProductsPageComponent } from './client-page/products-page/products-page.component';
import { WishlistPageComponent } from './client-page/wishlist-page/wishlist-page.component';
import { OrderPageComponent } from './client-page/order-page/order-page.component';
import { ProfilePageComponent } from './client-page/profile-page/profile-page.component';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { SellsPageComponent } from './seller-page/sells-page/sells-page.component';
import { HomePageComponentSeller } from './seller-page/home-page/home-page.component';
import { ProductsPageComponentSeller } from './seller-page/products-page/products-page.component';
import { CommonModule } from '@angular/common';
import { ProfilePageComponentSeller } from './seller-page/profile-page/profile-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditProductDialogComponent } from './dialogs/edit-product-dialog/edit-product-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'client-page',
        component: ClientPageComponent,
        children: [
          { path: 'home', component: HomePageComponent },
          { path: 'products', component: ProductsPageComponent },
          { path: 'wishlist', component: WishlistPageComponent },
          { path: 'profile', component: ProfilePageComponentSeller },
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
