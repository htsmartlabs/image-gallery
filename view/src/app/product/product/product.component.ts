import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ResponseProduct } from '../../model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: string;

  constructor( public data: DataService, private productService: ProductService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.data.responseProduct = { _id: '', user: this.data.user , category: this.data.category ,  name: '', image: '', description: ''};
    this.productId = '';
    this.activateRoute.params.subscribe(res => {
      this.productId = res['id'];
      this.viewSingleProduct();
    });
  }

  viewSingleProduct() {
    this.productService.viewSingleProduct(this.productId).subscribe(data => {
      this.data.responseProduct = data['product'] as ResponseProduct;
    }, error => {} );
  }
}
