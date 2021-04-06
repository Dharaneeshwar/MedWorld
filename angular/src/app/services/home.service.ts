import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../model/Cart';
import { Product } from '../model/product';
import { UserOrder } from '../model/UserOrder';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = "http://localhost:8080";
  //private baseUrl = "https://8080-dbdedffdadadeeffdaabdfaccfeebafecbf.examlyiopb.examly.io";
  constructor(private httpClient:HttpClient) { }

  getProduct(id:string):Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseUrl}/product/${id}`)
  }
  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/home`);
  }

  addToCart(id:string,quantity:number):Observable<CartProduct>{
    return this.httpClient.post<CartProduct>(`${this.baseUrl}/home/${id}`,{'id':id,'quantity':quantity});
  }

  getCartInfo(productId:string):Observable<CartProduct>{
    return this.httpClient.get<CartProduct>(`${this.baseUrl}/home/${productId}`);
  }

  removeFromCart(id:string):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/cart/delete`,id);
  }

  getRecentBuys():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/getRecentBuys`);
  }
}
