import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  isAddProductVisible:boolean = false;

  constructor(private route:Router) { }

  ngOnInit(): void {
    if (this.route.url == "/admin"){
      this.isAddProductVisible = true;
    }
  }

}
