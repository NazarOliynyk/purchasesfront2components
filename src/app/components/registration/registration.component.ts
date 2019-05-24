import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {ActivatedRoute, Router} from '@angular/router';
import {MainServiceService} from '../../services/main-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  responseRegistration: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private mainService: MainServiceService) { }

  ngOnInit() {
  }

  saveUser(registerForm: HTMLFormElement) {
    this.mainService.saveUser(this.user)
        .subscribe(value => {
            this.responseRegistration = value.text;
            if (value.text === 'User was saved successfully.') {
              this.router.navigate(['login']);
              }
            },
          error1 => { console.log(error1);
                      this.responseRegistration = 'Registration Failed'; } );
  }
}
