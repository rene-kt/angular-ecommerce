import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ClientPageComponent } from './client-page/client-page.component';
import { RouterModule } from '@angular/router';
import { SellerPageComponent } from './seller-page/seller-page.component';
import { SignComponentComponent } from './sign-component/sign-component.component';
import {MatTabsModule} from '@angular/material/tabs';

import { NgxMaskModule, IConfig } from 'ngx-mask'













@NgModule({
  declarations: [
    AppComponent,
    ClientPageComponent,
    SellerPageComponent,
    SignComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      {path: 'client-page', component: ClientPageComponent},
      {path: 'seller-page', component: SellerPageComponent},
      {path: 'sign-page', component: SignComponentComponent},
      {path: '', redirectTo: '/sign-page', pathMatch: 'full'},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
