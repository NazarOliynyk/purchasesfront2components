import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {ResponseTransfer} from '../models/ResponseTransfer';
import {Purchase} from '../models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveUser(user: User): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/saveUser', user);
  }

  login(user: User) {
    return this.http.post(this.url + '/login',
      JSON.stringify({username: user.username,
        password: user.password}),
      {observe: 'response'});
  }

  savePurchase(id: number, purchase: Purchase, headersOption: HttpHeaders):
    Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/savePurchase/' + id, purchase, {headers: headersOption});
  }

  getPurchases(id: number, headersOption: HttpHeaders): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(
      this.url + '/getPurchases/' + id, {headers: headersOption});
  }

  deleteByDate(date: Date, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/deleteByDate', date , {headers: headersOption});
  }
}
