import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginationComponent } from './components/logination/logination.component';
import { PurhasesComponent } from './components/purhases/purhases.component';
import { AllPurchasesComponent } from './components/all-purchases/all-purchases.component';
import { AddPurchaseComponent } from './components/add-purchase/add-purchase.component';
import { ClearPurchasesComponent } from './components/clear-purchases/clear-purchases.component';
import { ReportPurchasesComponent } from './components/report-purchases/report-purchases.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginationComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'purchases', component: PurhasesComponent,
    children: [
      {path: 'all', component: AllPurchasesComponent},
      {path: 'add', component: AddPurchaseComponent},
      {path: 'clear', component: ClearPurchasesComponent},
      {path: 'report', component: ReportPurchasesComponent}
    ]}
];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginationComponent,
    PurhasesComponent,
    AllPurchasesComponent,
    AddPurchaseComponent,
    ClearPurchasesComponent,
    ReportPurchasesComponent,
    AdminComponent,

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
