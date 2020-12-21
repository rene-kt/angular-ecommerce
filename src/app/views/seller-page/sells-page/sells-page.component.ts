import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderServiceService } from 'src/app/services/order-service.service.';


@Component({
  selector: 'app-sells-page',
  templateUrl: './sells-page.component.html',
  styleUrls: ['./sells-page.component.css']
})
export class SellsPageComponent implements OnInit {
  constructor(private orderService: OrderServiceService) {}

  isLoading: false;
  orders: Order[];
  selectedValue: string;

  ngOnInit(): void {
    this.selectedValue = 'price';
    this._getOrders();
  }


  selectOrder(){
    switch (this.selectedValue) {
      case 'price':
        this._orderByPrice();
        break;

      case 'name':
        this._orderByName();
        break;
      case 'date':
        this._orderByDate();
        break;
    }
  }
  _getOrders(){
    this.orderService.returnOrdersSeller().then(() =>{
      this.orders = this.orderService.ordersSeller;

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

  _orderByDate(){
    this.orders = this.orders.sort((a,b) => (a.instant> b.instant) ? -1 : ((b.instant > a.instant) ? 1 : 0)); 

  }
}
