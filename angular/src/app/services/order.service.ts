import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { OrderList } from '../model/order-list';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = "http://localhost:8080";
  //private baseUrl = "https://8080-dbdedffdadadeeffdaabdfaccfeebafecbf.examlyiopb.examly.io";
  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}/admin/orders`);
  }

  initOrders(obj:Object):Observable<OrderList>{
    return this.httpClient.post<OrderList>(`${this.baseUrl}/initOrders`,obj);
  }

  getOrder(id:string):Observable<OrderList>{
    return this.httpClient.get<OrderList>(`${this.baseUrl}/admin/orderlist/${id}`)
  }

  getOrderItems(orderId:string):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}/admin/orders/${orderId}`)
  }

  changeOrderStatus(orderId:string,status:number):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/admin/orders/${orderId}`,{'status':status});
  }

  // orderList 

  getOrderList():Observable<OrderList[]>{
    return this.httpClient.get<OrderList[]>(`${this.baseUrl}/admin/orderlist`);
  }

}
