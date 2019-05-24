import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }
  signIn() {
    this.router.navigate(['register']);
  }

  logIn() {
    this.router.navigate(['login']);
  }

}
