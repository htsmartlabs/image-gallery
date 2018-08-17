import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseProduct } from '../../model/product.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: string;
  constructor(public data: DataService, private userService: UserService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userId = '';
    this.data.userProducts = [];
    this.activateRoute.params.subscribe(res => {
      this.userId = res['id'];
      this.viewUserProduct();
    });
  }

  viewUserProduct() {
    this.userService.viewUserProduct(this.userId).subscribe(data => {
      this.data.userProducts = data['product'] as ResponseProduct[];
    }, error => {} );
  }
}
