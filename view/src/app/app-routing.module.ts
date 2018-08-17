import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { ProductComponent } from './product/product/product.component';
import { CategoryComponent } from './category/category/category.component';
import { UserComponent } from './user/user/user.component';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthService] },
  { path: 'user/:id', component: UserComponent },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthService] },
  { path: 'view-product', component: ViewProductComponent },
  { path: 'product/:id' , component: ProductComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'view-category', component: ViewCategoryComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
