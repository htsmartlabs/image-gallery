import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CategoryService } from '../../service/category.service';
import { Router } from '../../../../node_modules/@angular/router';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  constructor(public data: DataService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.viewCategory();
  }

  viewCategory() {
    this.categoryService.viewCategory().subscribe(data => {
      this.data.categories = data['category'] as Category[];
    }, error => {});
  }
}
