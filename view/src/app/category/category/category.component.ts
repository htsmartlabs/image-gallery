import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseProduct } from '../../model/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryId: string;
  constructor(public data: DataService, private categoryService: CategoryService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.categoryId = '';
    this.data.categoryProducts = [];
    this.activateRoute.params.subscribe(res => {
      this.categoryId = res['id'];
      this.viewCategoryProduct();
    });
  }

  viewCategoryProduct() {
    this.categoryService.viewCategoryProduct(this.categoryId).subscribe(data => {
      this.data.categoryProducts = data['product'] as ResponseProduct[];
    }, error => {} );
  }
}
