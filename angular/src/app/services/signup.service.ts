import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../model/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = "http://localhost:8080";
  //private baseUrl = "https://8080-dbdedffdadadeeffdaabdfaccfeebafecbf.examlyiopb.examly.io";
  constructor(private httpClient:HttpClient) { }

  register(cred:Signup):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/signup`,cred);
  }
}
