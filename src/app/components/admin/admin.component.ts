import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainServiceService} from '../../services/main-service.service';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../../models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  users: User [];
  headersOption: HttpHeaders;
  show = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private mainService: MainServiceService) { }

  ngOnInit(): void {

    if (localStorage.getItem('_token') !== null ) {
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      if (this.user.username === 'admin') {
        this.headersOption =
          new HttpHeaders({Authorization: localStorage.getItem('_token')});
        this.getUsers();
      }
    }
  }

  getUsers() {
    this.mainService.findAllUsers(this.headersOption).
    subscribe(value => {this.users = value;
                        this.show = true; },
      error1 => alert('Failed to load users'));
  }

  delete(u: User) {
    if (confirm('DO YOU REALLY WANT TO DELETE the ACCOUNT of: ' + u.username + '???')) {

      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.mainService.deleteUser(u, this.headersOption).
      subscribe(data => {
          alert(data.text);
          this.getUsers();
        },
        err => {console.log('err: ' + err.toString());
                alert('Failed to delete!'); } );
    }
  }
}
