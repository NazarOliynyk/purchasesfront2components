import {Component, OnInit} from '@angular/core';
import {User} from './models/User';
import {HttpHeaders} from '@angular/common/http';
import {MainServiceService} from './services/main-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Purchase} from './models/Purchase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User = new User();
  userToLogin: User = new User();
  responseRegistration = '';
  showRegisterForm = false;
  responseLogination = '';
  showLoginForm = false;
  headersOption: HttpHeaders;
  responseOnDelete = '';
  showGetUsersButton = true;


  constructor(private mainService: MainServiceService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) {
  }


  signIn() {
    this.showRegisterForm = true;
    this.showLoginForm = false;
    this.responseOnDelete = '';
    this.responseLogination = '';
    this.responseRegistration = '';
  }

  logIn() {
    this.showLoginForm = true;
    this.showRegisterForm = false;
    this.responseOnDelete = '';
    this.responseLogination = '';
    this.responseRegistration = '';
  }

  saveUser(registerForm: HTMLFormElement) {
    this.mainService.saveUser(this.user)
      .subscribe(u => {
          this.responseRegistration = u.text;
          console.log(u.text); },
        error1 => { console.log(error1);
                    this.responseRegistration = 'Registration Failed'; } );

  }

  logInto(loginForm: HTMLFormElement) {
    //
    // console.log(this.userToLogin.username);
    // console.log(this.userToLogin.password);
    this.mainService.login(this.userToLogin).
    subscribe(
      value => {
        const token = value.headers.get('Authorization');
        const userLogged = value.headers.get('UserLogged');

        localStorage.setItem('_token', token);
        // console.log('token: ' + token);
        this.showGetUsersButton = false;
        this.user = JSON.parse(userLogged);
        this.responseLogination = 'Hello: ' + this.user.username;
      },
      error1 => {
        this.responseLogination = 'Access denied';
      }
    );

  }

  logOut() {
    this.user = new User();
    this.userToLogin = new User();
    localStorage.clear();
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.responseOnDelete = '';
    this.responseLogination = '';
    this.responseRegistration = '';
    this.showGetUsersButton = true;
    this.router.navigate(['purchases'],
      {queryParams: this.user});
  }

  goToPurchases() {
    this.showLoginForm = false;
    this.showRegisterForm = false;
    this.router.navigate(['purchases'],
      {queryParams: this.user});
  }

  ngOnInit(): void {

  }
}
