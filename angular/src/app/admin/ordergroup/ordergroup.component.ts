import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderList } from 'src/app/model/order-list';
import { OrderService } from 'src/app/services/order.service';
import { OrderlistComponent } from '../orderlist/orderlist.component';

@Component({
  selector: 'app-ordergroup',
  templateUrl: './ordergroup.component.html',
  styleUrls: ['./ordergroup.component.css']
})
export class OrdergroupComponent implements OnInit {
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
    this.orderService.getOrderList().subscribe((data) => {
      this.orders = data;
    })
  }
  goToAccept(goto:string){
    this.router.navigateByUrl(goto);
  }
}
