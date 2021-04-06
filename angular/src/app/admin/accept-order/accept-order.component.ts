import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProduct } from 'src/app/model/Cart';
import { Order } from 'src/app/model/order';
import { OrderList } from 'src/app/model/order-list';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {
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
    this.orderService.getOrder(this.orderId).subscribe((data) => {
      this.orderData = data;
    })
    this.orderData = {
      'mobileNumber':'123456789',
      'id':12345,
      'paymentId':'12345',
      'prescriptionImage':'https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg',
      'status':0,
      'totalPrice':100,
      'userId':'0',
      'username':'daranip'
    };
  }

  getOrderItems(){
    this.orderService.getOrderItems(this.orderId).subscribe((data) => {
      this.orders = data;
    })
  }

  changeStatus(status:number){
    this.orderData.status = status;
    this.orderService.changeOrderStatus(this.orderId,status).subscribe((data) => {
      console.log("status changed succesfully");
    },error => console.log(error)
    )
  }
}
