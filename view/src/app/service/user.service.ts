import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private header: HttpHeaders;

  constructor(private http: HttpClient, private data: DataService) { }

  viewUser() {
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.get(environment.URI + environment.user, { headers: this.header });
  }

  viewUserProduct(id: string){
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.get(environment.URI + environment.user + '/' + id, { headers: this.header });
  }

  addUser(user: User) {
    return this.http.post(environment.URI + environment.user, user);
  }

  authUser(user: User) {
    return this.http.post(environment.URI + environment.user + '/login', user);
  }

  updateUser() {
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.put(environment.URI + environment.user + '/' + this.data.user._id, this.data.user, { headers: this.header });
  }

  deleteUser() {
    this.header = new HttpHeaders().set('autharization', localStorage.getItem('token'));
    return this.http.delete(environment.URI + environment.user + '/' + this.data.user._id, { headers: this.header });
  }
}
