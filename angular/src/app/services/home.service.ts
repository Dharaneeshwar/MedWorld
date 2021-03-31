import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = "http://localhost:8080";
  constructor(private httpClient:HttpClient) { }

  addToCart(id:string):Observable<Product[]>{
    return this.httpClient.post<Product[]>(`${this.baseUrl}/home/${id}`,true);
  }
}
