import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  isNavButtonVisible:boolean = true;

  constructor(private router:Router) { }

  ngOnInit(): void {
    if (this.router.url == '/login' || this.router.url == '/signup'){
      this.isNavButtonVisible = false;
    }
  }

}
