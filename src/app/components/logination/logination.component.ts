import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {MainServiceService} from '../../services/main-service.service';

@Component({
  selector: 'app-logination',
  templateUrl: './logination.component.html',
  styleUrls: ['./logination.component.css']
})
export class LoginationComponent implements OnInit {

  user: User = new User();
  userToLogin: User = new User();
  responseLogination: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private mainService: MainServiceService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => {
      localStorage.clear();
      this.user = new User();
    });
  }


  logInto(loginForm: HTMLFormElement) {

    this.mainService.login(this.userToLogin).
    subscribe(
      value => {
        const token = value.headers.get('Authorization');
        const userLogged = value.headers.get('UserLogged');
        localStorage.setItem('_token', token);
        localStorage.setItem('_userLogged', userLogged);
        this.user = JSON.parse(userLogged);
        if (this.user.username === 'admin') {
          this.router.navigate(['admin']);
          } else {
            this.router.navigate(['purchases'], {queryParams: this.user});
          }
        },
      error1 => { console.log(error1);
                  this.responseLogination = 'Access denied';
      }
    );

  }

}
