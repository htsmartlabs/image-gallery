import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private header: HttpHeaders;

  constructor(private http: HttpClient) { }

  viewCategory() {
    return this.http.get(environment.URI + environment.category);
  }

  viewCategoryProduct(id: string) {
    return this.http.get(environment.URI + environment.category + '/' + id);
  }

  addCategory(category: Category) {
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.post(environment.URI + environment.category, category, { headers: this.header });
  }

  updateCategory(category: Category) {
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.put(environment.URI + environment.category + '/' + category._id, category, { headers: this.header });
  }

  deleteCategory(category: Category) {
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.delete(environment.URI + environment.category + '/' + category._id, { headers: this.header });
  }
}
