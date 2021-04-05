import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderList } from '../model/order-list';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-user-ordergroup',
  templateUrl: './user-ordergroup.component.html',
  styleUrls: ['./user-ordergroup.component.css']
})
export class UserOrdergroupComponent implements OnInit {
  orders:OrderList[] = [];
  constructor(private router:Router, private orderService:OrderService) { }

  ngOnInit(): void {
    this.getOrderList();
    // this.orders = [
    //   {
    //     'orderId':1,
    //     'paymentId':'pay-345233',
    //     'userId':'1',
    //     'username':'daranip',
    //     'mobileNumber':'1234567890',
    //     'prescriptionImage':"https://tiimg.tistatic.com/fp/1/006/254/paracetamol-tablets-ip-803.jpg",
    //     'totalPrice':120,
    //     'status':1
    //   }
    // ]
  }
  getOrderList() {
    this.orderService.getUserOrderList().subscribe((data) => {
      this.orders = data;
    })
  }
  goToAccept(goto:string){
    this.router.navigateByUrl(goto);
  }

}
