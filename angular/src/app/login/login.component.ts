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

  ngOnInit(): void {}
  showError:boolean = false;
  showLoading:boolean = false;

  onsubmit() {
    this.showLoading = true;
    this.showError = false;
    this.loginService.login(this.login).subscribe(
      (data) => {
        if (data){
          this.goToHome();
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
    this.router.navigateByUrl('/home')
  }
}
