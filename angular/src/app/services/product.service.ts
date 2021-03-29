import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8080"
  constructor(private httpClient: HttpClient) { 

  }
  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/admin`);
  }

  addProduct(product:Product):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/admin/addProduct`,product);
  } 
}
