import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServerMessage } from '../../model/server-message.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userService: UserService, public data: DataService, private router: Router) { }

  ngOnInit() {
  }

  userLogin(form: NgForm) {
    this.userService.authUser(this.data.user).subscribe( data => {
      this.data.serverMessage = data as ServerMessage;
      this.data.user = data['user'] as User;
      if (this.data.serverMessage.status) {
        this.data.serverMessage.token = 'Jwt ' + this.data.serverMessage.token;
        localStorage.setItem('token', this.data.serverMessage.token);
        this.data.requestProduct.user = this.data.user._id;
        this.router.navigate(['/']);
      } else {
        alert(this.data.serverMessage.message);
      }
    }, error => {});
  }

}
