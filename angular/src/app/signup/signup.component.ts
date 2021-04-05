import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from '../model/signup';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signup: Signup = new Signup();
  confirmPass: string = '';
  constructor(private signupServices: SignupService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
  }
  showError: boolean = false;
  showLoading: boolean = false;
  showPassNotMatch:boolean = false;
  userExists:boolean = false;

  onsubmit() {
    console.log(this.signup);
    this.userExists = false;
    this.showPassNotMatch = false;
    this.showError = false;
    if (this.signup.password == this.confirmPass) {
      this.showLoading = true;
      this.signupServices.register(this.signup).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.goToLogin();
          } else {
            this.showLoading = false;
            this.userExists = true;
          }
        },
        (error) => {
          console.log(error);
          this.showLoading = false;
          this.showError = true;
        }
      );
    } else {
      this.showPassNotMatch = true;
    }
  }
  private goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
