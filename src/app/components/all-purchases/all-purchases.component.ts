import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {HttpHeaders} from '@angular/common/http';
import {Purchase} from '../../models/Purchase';
import {MainServiceService} from '../../services/main-service.service';

@Component({
  selector: 'app-all-purchases',
  templateUrl: './all-purchases.component.html',
  styleUrls: ['./all-purchases.component.css']
})
export class AllPurchasesComponent implements OnInit {
  user: User;
  headersOption: HttpHeaders;
  purchases: Purchase [] = [];
  show = false;

  constructor(private mainService: MainServiceService) { }

  ngOnInit(): void {

    if (localStorage.getItem('_token') !== null ) {
      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      this.getPurchases(this.user);
      this.show = true;
    }
  }
  getPurchases(user: User) {
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
    this.mainService.getPurchases(user.id, this.headersOption).
    subscribe(value => {this.purchases = value; },
      error1 => {console.log(error1);
                 alert('Failed to load purchases. Your session might have expired. Try to Log In'); });
  }
}
