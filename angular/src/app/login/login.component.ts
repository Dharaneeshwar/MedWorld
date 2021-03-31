import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login = new Login();

  constructor(private loginService:LoginService,private router:Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      this.loginService.getUserStatus().subscribe(
        (data) => {
          if (data.status){
            if (data.isAdmin){
              this.goToAdmin();
            } else {
              this.goToHome();
            }
          } else {
            console.log("User Status not available");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  showError:boolean = false;
  showLoading:boolean = false;

  onsubmit() {
    this.showLoading = true;
    this.showError = false;
    this.loginService.login(this.login).subscribe(
      (data) => {
        if (data.status){
          localStorage.setItem('token',data.token);
          if (data.isAdmin){
            this.goToAdmin();
          } else{
          this.goToHome();
          }
        } else {
          this.showError = true;
          this.showLoading = false;
        }
      },
      (error) => {
        console.log(error);
        this.showError = true;
        this.showLoading = false;
      }
    );
    
  }
  private goToHome(){
    this.router.navigateByUrl('/home');
  }

  private goToAdmin(){
    this.router.navigateByUrl('/admin');
  }

}
