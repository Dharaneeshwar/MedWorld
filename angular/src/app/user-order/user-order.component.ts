import { Component, OnInit } from '@angular/core';

import { UserOrder } from '../model/UserOrder';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  
  orders !: Array<UserOrder>;
  
  constructor() { }

  ngOnInit(): void {
    this.orders=new Array<UserOrder>();

    const order1 = new UserOrder(); 
    order1.name="paracetamol"; 
    order1.quantity=1; 
    order1.price=2500;
    this.orders.push(order1);

    const order2 = new UserOrder(); 
    order2.name="covaxin"; 
    order2.quantity=7; 
    order2.price=277;
    this.orders.push(order2);
    
   
    
  }
 
}
