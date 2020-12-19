import { OrderServiceService } from './../../services/order-service.service.';
import { Order } from './../../models/order';
import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  constructor(private orderService: OrderServiceService) {}

  isLoading: false;
  orders: Order[];
  selectedValue: string;

  ngOnInit(): void {
    this.selectedValue = 'price';
    this._getOrders();
  }


  selectOrder(){
    if(this.selectedValue==='price'){
      this._orderByPrice();
    }else if(this.selectedValue === 'name'){
      this._orderByName();
    }
  }
  _getOrders(){
    this.orderService.returnOrders().then(() =>{
      this.orders = this.orderService.orders;

      this._orderByPrice();
      this.isLoading = false;
    })
  }

  _orderByPrice(){
    this.orders = this.orders.sort((a,b) => (a.productOrder.price > b.productOrder.price) ? -1 : ((b.productOrder.price > a.productOrder.price) ? 1 : 0)); 
  }

  _orderByName(){
    this.orders = this.orders.sort((a,b) => (a.productOrder.name > b.productOrder.name) ? 1 : ((b.productOrder.name > a.productOrder.name) ? -1 : 0)); 

  }


  }
  
