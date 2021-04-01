import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = "http://localhost:8080"
  constructor(private httpClient:HttpClient) { }

  placeSingleProduct(obj:any){
    console.log('Single');
    return this.httpClient.post(`${this.baseUrl}/placeOrder`,obj)
  }
  placeCartProducts(obj:any){
    console.log("cart");
    return this.httpClient.post(`${this.baseUrl}/orders`,obj)
  }
}
