import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { PurchaseComponentComponent } from './purchase-component/purchase-component.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'purchases', component: PurchaseComponentComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    PurchaseComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
