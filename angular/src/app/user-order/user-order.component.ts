import { Component, OnInit } from '@angular/core';

import { UserOrder } from '../model/UserOrder';
import { UserOrderService } from '../services/user-order.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  
  orders : Array<any> = new Array<UserOrder>();
  
  constructor(private userOrderService:UserOrderService) { }

  ngOnInit(): void { 
    this.getOrders();
  }
  private getOrders(){
    this.userOrderService.getOrders().subscribe(data=>{
      this.orders = data;
      console.log(this.orders);
    },error => console.log(error)
    );
  }
 
}
