import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {HttpHeaders} from '@angular/common/http';
import {MainServiceService} from '../services/main-service.service';
import {Purchase} from '../models/Purchase';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-purchase-component',
  templateUrl: './purchase-component.component.html',
  styleUrls: ['./purchase-component.component.css']
})
export class PurchaseComponentComponent implements OnInit {

  user: User;
  headersOption: HttpHeaders;
  purchase: Purchase = new Purchase();
  purchases: Purchase[];
  showAddPurchaseForm = true;
  priceOfPurchase: any;
  showPurchases = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
    this.activatedRoute.queryParams.subscribe((data: User) => {
      this.user = data;
    });
    this.mainService.getPurchases(this.user.id, this.headersOption).
    subscribe(value => {this.purchases = value; },
      error1 => {console.log('Failed to load purchases'); });
  }

  savePurchase(addPurchaseForm) {
    this.purchase.price = parseFloat(this.priceOfPurchase);
    console.log(this.purchase.date);
    console.log(this.purchase.name);
    console.log(this.purchase.price);
    console.log(this.purchase.currency);
    this.mainService.savePurchase(this.user.id, this.purchase, this.headersOption).
      subscribe(value => {console.log(value.text); },
      error1 => {console.log('Failed to save the purchase'); });
  }
}
