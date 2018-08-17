import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { User } from '../model/user.model';
import { RequestProduct, ResponseProduct } from '../model/product.model';
import { ServerMessage } from '../model/server-message.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  category: Category;
  categories: Category[];
  user: User;
  users: User[];
  requestProduct: RequestProduct;
  responseProduct: ResponseProduct;
  responseProducts: ResponseProduct[];
  categoryProducts: ResponseProduct[];
  userProducts: ResponseProduct[];
  serverMessage: ServerMessage;

  constructor() {
    this.category = { _id: '', name: ''};
    this.categories = [];
    this.user = { _id: '', name: '', email: '', password : '', confirmPassword : '', isSeller: false };
    this.users = [];
    this.requestProduct = { _id: '', user: '', category : '', name: '', image: null, description: ''};
    this.responseProduct = { _id: '', user: this.user , category: this.category ,  name: '', image: '', description: ''};
    this.responseProducts = [];
    this.categoryProducts = [];
    this.userProducts = [];
    this.serverMessage = { status: false, message: '', token: ''};
  }
}
