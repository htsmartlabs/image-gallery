import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { DataService } from '../service/data.service';
import { ResponseProduct } from '../model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, public data: DataService) { }

  ngOnInit() {
    this.viewProduct();
  }

  viewProduct() {
    this.productService.viewProduct().subscribe(data => {
      this.data.responseProducts = data['product'] as ResponseProduct[];
    }, error => {} );
  }
}
