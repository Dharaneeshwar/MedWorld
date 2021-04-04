import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../model/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = "http://localhost:8080";
  //private baseUrl = "https://8080-dbdedffdadadeeffdaabdfaccfeebafecbf.examlyiopb.examly.io";
  constructor(private httpClient:HttpClient) { }

  getUserInfo():Observable<UserDetails>{
    return this.httpClient.get<UserDetails>(`${this.baseUrl}/profile`);
  }

  updateUserInfo(data:UserDetails):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/profile`,data)
  }
}
