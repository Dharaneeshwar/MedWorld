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
  }

  private getOrders(){
    this.orderServices.getOrders().subscribe(data=>{
      this.orders = data;
      console.log(this.orders);
    },error => console.log(error)
    );
  }
}
