import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private header: HttpHeaders;

  constructor(private http: HttpClient) { }

  viewProduct() {
    return this.http.get(environment.URI + environment.product);
  }

  viewSingleProduct(id: string) {
    return this.http.get(environment.URI + environment.product + '/' + id);
  }

  addProduct(product: FormData) {
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.post(environment.URI + environment.product, product, { headers: this.header });
  }
}
