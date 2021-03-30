import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = "http://localhost:8080"
  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}/admin/orders`);
  }
}
