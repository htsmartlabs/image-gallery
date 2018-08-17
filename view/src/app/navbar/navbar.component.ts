import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public data: DataService, private router: Router) {
    this.logout();
  }

  ngOnInit() {
  }

  get token() {
    return localStorage.getItem('token');
  }


  logout() {
    this.data.user = { _id: '', name: '', email: '', password : '', confirmPassword : '', isSeller: false };
    localStorage.clear();
    this.router.navigate(['']);
  }
}
