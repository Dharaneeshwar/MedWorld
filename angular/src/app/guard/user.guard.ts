import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  async canActivate(): Promise<boolean>{
    return new Promise<boolean>((resolve,reject) => {
      this.loginService.getUserStatus().subscribe(
        (data) => {
          console.log(data);
          if (data.status) {
            console.log("accepted");
            resolve(true);
          } else {
            console.log("falsed");
            resolve(false);
          }
        },
        (error) => {
          console.log("Error");
          this.router.navigate(['login']);
          resolve(false);
        }
      );
    });
  }
}
