import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOrder } from '../model/UserOrder';

@Injectable({
  providedIn: 'root'
})
export class UserOrderService {

  private baseUrl = "http://localhost:8080"
  constructor(private httpClient:HttpClient) { }

  getOrders():Observable<UserOrder[]>{
    return this.httpClient.get<UserOrder[]>(`${this.baseUrl}/orders`);
  }

}