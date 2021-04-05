import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../model/order';
import { OrderList } from '../model/order-list';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-user-orderitems',
  templateUrl: './user-orderitems.component.html',
  styleUrls: ['./user-orderitems.component.css']
})
export class UserOrderitemsComponent implements OnInit {
  orderId:string = "";
  orderData!:OrderList;
  orders:Order[] = [];
  
  constructor(private orderService:OrderService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.getOrderDetails();
    this.getOrderItems();
  }

  getOrderDetails(){
    this.orderService.getUserOrder(this.orderId).subscribe((data) => {
      this.orderData = data;
    })
    this.orderData = {
      'mobileNumber':'123456789',
      'orderId':12345,
      'paymentId':'12345',
      'prescriptionImage':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg',
      'status':0,
      'totalAmount':100,
      'userId':'0',
      'userName':'daranip'
    };
  }

  getOrderItems(){
    this.orderService.getUserOrderItems(this.orderId).subscribe((data) => {
      this.orders = data;
    })
  }

}
