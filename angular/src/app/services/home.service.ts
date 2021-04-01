import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../model/Cart';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = "http://localhost:8080";
  constructor(private httpClient:HttpClient) { }

  getProduct(id:string):Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseUrl}/product/${id}`)
  }

  addToCart(id:string,quantity:number):Observable<CartProduct>{
    return this.httpClient.post<CartProduct>(`${this.baseUrl}/home/${id}`,{'id':id,'quantity':quantity});
  }

  getCartInfo(productId:string):Observable<CartProduct>{
    return this.httpClient.get<CartProduct>(`${this.baseUrl}/home/${productId}`);
  }
}
