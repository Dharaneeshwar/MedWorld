import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { UserToken } from '../model/user-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:8080";
  constructor(private httpClient:HttpClient) { }

  login(cred:Login):Observable<UserToken>{
    return this.httpClient.post<UserToken>(`${this.baseUrl}/login`,cred);
  }

  getUserStatus():Observable<UserToken>{
    return this.httpClient.post<UserToken>(`${this.baseUrl}/userStatus`,true);
  }

  logout():Observable<Object>{
    return this.httpClient.get(`${this.baseUrl}/logout`);
  }
}
