import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainServiceService} from '../../services/main-service.service';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../../models/User';
import {ResponseTransfer} from '../../models/ResponseTransfer';

@Component({
  selector: 'app-report-purchases',
  templateUrl: './report-purchases.component.html',
  styleUrls: ['./report-purchases.component.css']
})
export class ReportPurchasesComponent implements OnInit {

  user: User;
  headersOption: HttpHeaders;
  responseTransfer: ResponseTransfer = new ResponseTransfer();
  billingYear = '';
  resultOnReport: any;
  years: string [] = ['2000', '2001', '2002', '2003', '2004', '2005', '2006',
  '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  billingCurrency: CurrencyType;
  showResultOnReport = false;
  show = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private mainService: MainServiceService) { }

  ngOnInit(): void {

    if (localStorage.getItem('_token') !== null ) {
      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      this.activatedRoute.queryParams.subscribe((data: User) => {
        this.user = data;
        this.show = true;
      });
    }
  }

  report(billingYearForm) {
    this.responseTransfer = new ResponseTransfer();
    this.responseTransfer.text = this.billingYear;
    this.responseTransfer.currency = this.billingCurrency;

    this.mainService.report(this.user, this.responseTransfer, this.headersOption).
      subscribe(value => {
                          this.showResultOnReport = true;
                          this.resultOnReport = value.text; },
      error1 => {console.log(error1);
                 alert('Failed to calculate'); });
  }

}
