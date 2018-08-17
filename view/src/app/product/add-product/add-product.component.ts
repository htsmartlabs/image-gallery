import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  fileName: string;

  constructor(public data: DataService, private productService: ProductService,
     private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.fileName = '';
    this.viewCategory();
  }

  fileChange(event: any) {
    this.data.requestProduct.image = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  viewCategory() {
    this.categoryService.viewCategory().subscribe(data => {
      this.data.categories = data['category'] as Category[];
    }, error => {});
  }

  async post() {
    const form = new FormData();
    form.append('file', this.data.requestProduct.image, this.fileName);
    form.append('name', this.data.requestProduct.name);
    form.append('description', this.data.requestProduct.description);
    form.append('user', this.data.requestProduct.user);
    form.append('category', this.data.requestProduct.category);

    this.productService.addProduct(form).subscribe(data => {
      this.router.navigate(['/']);
    }, error => {});
  }
}
