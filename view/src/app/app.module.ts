import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { DataService } from './service/data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserService } from './service/user.service';
import { ProductService } from './service/product.service';
import { CategoryService } from './service/category.service';
import { CategoryComponent } from './category/category/category.component';
import { ProductComponent } from './product/product/product.component';
import { UserComponent } from './user/user/user.component';
import { AuthService } from './service/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    ViewProductComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    ViewUserComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    CategoryComponent,
    ProductComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DataService, UserService, ProductService, CategoryService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
