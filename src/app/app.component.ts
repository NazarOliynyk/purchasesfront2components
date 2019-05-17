import {Component, OnInit} from '@angular/core';
import {User} from './models/User';
import {HttpHeaders} from '@angular/common/http';
import {MainServiceService} from './services/main-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Purchase} from './models/Purchase';
import {ResponseTransfer} from './models/ResponseTransfer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User = new User();
  userToLogin: User = new User();
  responseRegistration = '';
  showRegisterForm = false;
  responseLogination = '';
  showLoginForm = false;
  headersOption: HttpHeaders;
  showDeleteUserButton = true;
  showPurchases = false;
  purchase: Purchase = new Purchase();
  purchases: Purchase [] = [];
  priceOfPurchase: any;
  dateToDelete: Date;
  responseTransfer: ResponseTransfer = new ResponseTransfer();
  billingYear = '';
  resultOnReport: number;
  showResultOnReport = false;
  years: string [] = ['2000', '2001', '2002', '2003', '2004', '2005', '2006',
  '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];

  constructor(private mainService: MainServiceService) {  }

  signIn() {
    this.user = new User();
    this.showPurchases = false;
    this.showRegisterForm = true;
    this.showLoginForm = false;
    this.responseLogination = '';
    this.responseRegistration = '';
  }

  logIn() {
    this.userToLogin = new User();
    this.showPurchases = false;
    this.showLoginForm = true;
    this.showRegisterForm = false;
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

  getPurchases(user: User) {
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
    this.mainService.getPurchases(user.id, this.headersOption).
    subscribe(value => {this.purchases = value; },
      error1 => {console.log(error1);
                 alert('Failed to load purchases'); });
  }

  logInto(loginForm: HTMLFormElement) {
    this.showPurchases = false;
    this.mainService.login(this.userToLogin).
    subscribe(
      value => {
        const token = value.headers.get('Authorization');
        const userLogged = value.headers.get('UserLogged');
        localStorage.setItem('_token', token);
        this.showLoginForm = false;
        this.showDeleteUserButton = false;
        this.user = JSON.parse(userLogged);
        this.responseLogination = 'HELLO! You logged in as: ' + this.user.username;
        this.showPurchases = true;
        this.getPurchases(this.user);
      },
      error1 => { console.log(error1);
                  this.responseLogination = 'Access denied';
      }
    );

  }

  logOut() {
    this.user = new User();
    this.userToLogin = new User();
    this.purchase = new Purchase();
    localStorage.clear();
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.showPurchases = false;
    this.showDeleteUserButton = true;
    this.showResultOnReport = false;
    this.responseLogination = '';
    this.responseRegistration = '';
    this.billingYear = '';
  }

  deleteAccount() {
    if (confirm('DO YOU REALLY WANT TO DELETE YOUR ACCOUNT???')) {

      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.mainService.deleteUser(this.user, this.headersOption).
      subscribe(data => {
          alert(data.text);
          this.showPurchases = false;
          this.showLoginForm = false;
          this.showRegisterForm = false; },
        err => {console.log('err: ' + err.toString());
                alert('Failed to delete!'); } );
    }
  }

  savePurchase(addPurchaseForm) {
    this.purchase.price = parseFloat(this.priceOfPurchase);
    this.mainService.savePurchase(this.user.id, this.purchase, this.headersOption).
    subscribe(value => {console.log(value.text);
                        this.getPurchases(this.user); },
      error1 => {console.log('Failed to save the purchase'); });
  }

  deletePurchases(dateToDeleteForm) {
    if (confirm('DO YOU REALLY WANT TO DELETE YOUR purchases of: ' + this.dateToDelete.toString() + '???')) {
      // this.dateToDelete = new Date();
      this.responseTransfer.date = this.dateToDelete;
      this.mainService.deleteByDate(this.user, this.responseTransfer, this.headersOption).
      subscribe(value => {console.log(value.text);
                          alert(value.text);
                          this.showLoginForm = false;
                          this.showRegisterForm = false;
                          this.getPurchases(this.user); },
        error1 => {console.log(error1);
                   alert('Failed to delete'); });

    }
  }

  report(billingYearForm) {
    this.responseTransfer = new ResponseTransfer();
    this.responseTransfer.text = this.billingYear;
    this.mainService.report(this.user, this.responseTransfer, this.headersOption).
      subscribe(value => {console.log(value.sum);
                          this.showResultOnReport = true;
                          this.resultOnReport = value.sum; },
      error1 => {console.log(error1);
                 alert('Failed to calculate'); });
  }
}
