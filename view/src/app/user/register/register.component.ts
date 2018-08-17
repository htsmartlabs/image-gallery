import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { DataService } from '../../service/data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ServerMessage } from '../../model/server-message.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, public data: DataService, private router: Router) { }

  ngOnInit() {
  }

  registerForm(form: NgForm) {
    if (this.data.user._id === '') {
      if (this.data.user.password === this.data.user.confirmPassword) {
        this.userService.addUser(this.data.user).subscribe((data) => {
          this.router.navigate(['/login']);
        }, (error) => {});
      } else {
        alert('Password did not match');
      }
    } else {
      if (this.data.user.password === this.data.user.confirmPassword) {
        this.userService.updateUser().subscribe((data) => {
          this.data.serverMessage = data as ServerMessage;
          alert(this.data.serverMessage.message);
          this.router.navigate(['/login']);
        }, (error) => {});
      } else {
        alert('Password did not match');
      }
    }
  }
}
