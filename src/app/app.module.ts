import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';
import { StoreComponent } from './components/store/store.component';
import { GoodsComponent } from './components/goods/goods.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TransactionsWithIdComponent } from './components/transactions-with-id/transactions-with-id.component';
import { TransactionsWithIdAndPeriodComponent } from './components/transactions-with-id-and-period/transactions-with-id-and-period.component';
import { AllTransactionsComponent } from './components/all-transactions/all-transactions.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    GoodsComponent,
    TransactionsComponent,
    NotFoundComponent,
    NavBarComponent,
    FooterComponent,
    TransactionsWithIdComponent,
    TransactionsWithIdAndPeriodComponent,
    AllTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
