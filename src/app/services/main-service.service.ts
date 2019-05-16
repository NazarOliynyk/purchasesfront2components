import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {ResponseTransfer} from '../models/ResponseTransfer';
import {Purchase} from '../models/Purchase';
import {Rates} from '../models/Rates';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

   url = 'http://localhost:8080';
  // urlFixer = 'http://data.fixer.io/api/latest\n' +
  //   '?access_key=229d1da7b736ef77d158ea0c224c4344\n' +
  //   '&symbols=USD,EUR,PLN,UAH';
  urlFixer = 'http://data.fixer.io/api/2018-12-24\n' +
    '?access_key=229d1da7b736ef77d158ea0c224c4344\n' +
    '&symbols=USD,EUR,PLN,UAH';

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

  deleteUser(user: User, headersOption: HttpHeaders):
    Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>
    (this.url + '/deleteUser/' + user.id, {headers: headersOption});
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

  deleteByDate(user: User, responseTransfer: ResponseTransfer, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/deleteByDate/' + user.id, responseTransfer , {headers: headersOption});
  }

  // getRates(): Observable<Rates> {
  //   return this.http.get<Rates>(this.urlFixer);
  // }

  getRates(headersOption: HttpHeaders)  {
    return this.http.get(this.url + '/getRates', {headers: headersOption});
  }
}
