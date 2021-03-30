import { Component, OnInit } from '@angular/core';
import { HomeProduct } from '../model/HomeProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeproduct !: Array<HomeProduct>;
  constructor() { }

  ngOnInit(): void {

    this.homeproduct=new Array<HomeProduct>();

    const homeproduct1=new HomeProduct();
    homeproduct1.medicinename='Paracetamol';
    homeproduct1.price=100;
    homeproduct1.imagelink="https://post.healthline.com/wp-content/uploads/2020/08/Griseofulvin_Oral_Tablet-732x549-thumbnail-1-732x549.jpg";
    this.homeproduct.push(homeproduct1);

    const homeproduct2=new HomeProduct();
    homeproduct2.medicinename='Paracetamol';
    homeproduct2.price=100;
    homeproduct2.imagelink="data:image/jpeg;base64,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";
    this.homeproduct.push(homeproduct2);
    
    const homeproduct3=new HomeProduct();
    homeproduct3.medicinename='CSK';
    homeproduct3.price=1000;
    homeproduct3.imagelink="https://post.healthline.com/wp-content/uploads/2020/08/Griseofulvin_Oral_Tablet-732x549-thumbnail-1-732x549.jpg";
    this.homeproduct.push(homeproduct3);
  }

}
