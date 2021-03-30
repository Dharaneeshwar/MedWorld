import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:8080"
  constructor(private httpClient:HttpClient) { }

  login(cred:Login):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/login`,cred);
  }
}
