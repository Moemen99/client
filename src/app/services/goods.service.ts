import { Transaction } from './../interfaces/transaction';
import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'
import { environment } from 'src/environment/environment';
import { map, Observable } from 'rxjs';
import { Store } from '../interfaces/store';
import { Good } from '../interfaces/good';
import { GoodWithDetails } from '../interfaces/good-with-details';
@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private _http:HttpClient) { }

  getStore():Observable<Store[]>
  {
    return this._http.get<any[]>('Goods/Stores').pipe(
      map(response => response.map(item =>({
        name :item.name,
        storeFileDate :item.storeFileDate
        
      })))
    );
  }
  
  getGoods():Observable<Good[]>
  {
    return this._http.get<any[]>('Goods').pipe(
      map(response => response.map(item => ({
        goodID: item.goodID,
        goodInitialBalance: item.goodInitialBalance
      })))
    );
  }
  
  getTransactions():Observable<Transaction[]>
  {
    return this._http.get<any[]>('Goods/Transactions').pipe(
      map(response => response.map(item => ({
        goodID: item.goodID,
        transactionID: item.transactionID,
        transactionDate: item.transactionDate,
        amount:item.amount,
        direction:item.direction,
        comment:item.comment
      })))
    );
  }

  getFilteredTransactionswithId(goodId: string):Observable<GoodWithDetails[]>
  {
    return this._http.get<any[]>('Goods',{params :{goodId}})
    .pipe(
      map(response => response.map(item =>({
      goodID: item.goodID,
      goodInitialBalance: item.goodInitialBalance,
      transactions: item.transactions.map((t :Transaction ) => ({
        transactionID: t.transactionID,
        transactionDate: t.transactionDate,
        amount: t.amount,
        direction: t.direction,
        comment: t.comment
        }))
      })))
    );
  }

  getFilteredTransactionswithIdAndPeriod(goodId: string, startDate: string, endDate: string):Observable<GoodWithDetails[]>
  {
    return this._http.get<any[]>(`Goods`+`?GoodId=${goodId}&TransactionStartDate=${startDate}&TransactionEndDate=${endDate}`).pipe(
      map(response => response.map(item =>({
      goodID: item.goodID,
      goodInitialBalance: item.goodInitialBalance,
      transactions: item.transactions.map((t :Transaction ) => ({
        transactionID: t.transactionID,
        transactionDate: t.transactionDate,
        amount: t.amount,
        direction: t.direction,
        comment: t.comment
        }))
      })))
    );

  }
}
