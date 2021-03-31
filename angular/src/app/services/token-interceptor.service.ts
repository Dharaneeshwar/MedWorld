import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>,next:HttpHandler){
    
    let tokenizedReq = request.clone({
      setHeaders:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
