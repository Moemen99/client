import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { GoodsComponent } from './components/goods/goods.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsWithIdComponent } from './components/transactions-with-id/transactions-with-id.component';
import { TransactionsWithIdAndPeriodComponent } from './components/transactions-with-id-and-period/transactions-with-id-and-period.component';
import { AllTransactionsComponent } from './components/all-transactions/all-transactions.component';

const routes: Routes = [
  {path:'',redirectTo:'/store',pathMatch: 'full'},
  {path:'store',component:StoreComponent},
  {path:'goods',component:GoodsComponent},
  {path:'transactions',component:TransactionsComponent,children: [
    { path: 'all', component:AllTransactionsComponent },
    { path: 'withId', component: TransactionsWithIdComponent },
    { path: 'withIdAndPeriod', component: TransactionsWithIdAndPeriodComponent },
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    {path:'**',component:NotFoundComponent}
  ]},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
