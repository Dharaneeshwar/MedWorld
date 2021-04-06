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

  initOrders(obj:Object):Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}/initOrders`,obj);
  }

  getOrderItems(orderId:string):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}/admin/orders/${orderId}`)
  }

  changeOrderStatus(orderId:string,status:number):Observable<Object>{
    console.log("Change status.... call",orderId,status);
    return this.httpClient.post(`${this.baseUrl}/admin/changeStatus/${orderId}`,status);
  }

  // orderList 

  getOrderList():Observable<OrderList[]>{
    return this.httpClient.get<OrderList[]>(`${this.baseUrl}/admin/orderlist`);
  }

  getOrder(id:string):Observable<any>{
    console.log("orderlists id.....",id);
    return this.httpClient.get<any>(`${this.baseUrl}/admin/orderlist/${id}`)
  }

  // For user 
  getUserOrderList():Observable<OrderList[]>{
    return this.httpClient.get<OrderList[]>(`${this.baseUrl}/orderlist`);
  }


  getUserOrder(id:string):Observable<OrderList>{
    return this.httpClient.get<OrderList>(`${this.baseUrl}/orderlist/${id}`)
  }

  getUserOrderItems(orderId:string):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}/orders/${orderId}`)
  }

  getParticularOrder(id:string):Observable<Order>{
    return this.httpClient.get<Order>(`${this.baseUrl}/admin/order/${id}`)
  }

  getUserParticularOrder(id:string):Observable<Order>{
    return this.httpClient.get<Order>(`${this.baseUrl}/order/${id}`)
  }
}
