import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrderlistComponent } from './admin/orderlist/orderlist.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { EditproductComponent } from './admin/editproduct/editproduct.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ProductpageComponent } from './productpage/productpage.component';
import { PaymentComponent } from './payment/payment.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { UserGuard } from './guard/user.guard';
import { AdminGuard } from './guard/admin.guard';
import { OrdergroupComponent } from './admin/ordergroup/ordergroup.component';
import { AcceptOrderComponent } from './admin/accept-order/accept-order.component';
import { UserOrdergroupComponent } from './user-ordergroup/user-ordergroup.component';
import { UserOrderitemsComponent } from './user-orderitems/user-orderitems.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddproductComponent,
    AdminNavComponent,
    DashboardComponent,
    OrderlistComponent,
    ProductEditComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    HomeComponent,
    UserOrderComponent,
    EditproductComponent,
    UserNavComponent,
    ProfileComponent,
    ProductpageComponent,
    PaymentComponent,
    PrescriptionComponent,
    OrdergroupComponent,
    AcceptOrderComponent,
    UserOrdergroupComponent,
    UserOrderitemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
