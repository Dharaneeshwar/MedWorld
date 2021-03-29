import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  orders:Order[] = [];
  constructor(private orderServices:OrderService) { }

  ngOnInit(): void {
    this.getOrders();
    this.orders = ([
      {
        "orderId":"1",
        "userid":"daranip",
        "ProductName":"Tablet",
        "quantity":5,
        "totalPrice":"200",
        "Status":"Bought",
        "Price":"2000"
      },
      {
        "orderId":"2",
        "userid":"daranip2",
        "ProductName":"Tablet2",
        "quantity":5,
        "totalPrice":"200",
        "Status":"Bought",
        "Price":"2000"
      }
    ]);
  }

  private getOrders(){
    this.orderServices.getOrders().subscribe(data=>{
      this.orders = data;
    },error => console.log(error)
    );
  }
}
