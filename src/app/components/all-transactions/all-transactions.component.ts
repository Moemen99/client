import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {

  transactions: Transaction[] =[];
  summary = {
              numberOfTransactions :0,
              totalAmount:0,
              remainingAmount:0
            }

    
    constructor(private _goodService : GoodsService) {}

    ngOnInit(): void {
      this.loadTransactions();
    }

    loadTransactions(){
      this._goodService.getTransactions().
      subscribe({
                next: (data) =>{this.transactions = data;},
                error:(error)=>{console.error('Error fetching transactions:',error)}
                });
    }

    calculateSummary(){
      this.summary.numberOfTransactions=this.transactions.length;
      this.summary.totalAmount = this.transactions.reduce((total,t)=>{
        return total + (t.direction === 'In' ? t.amount : -t.amount);
      },0);
      this.summary.remainingAmount = this.transactions.reduce((remaining,t)=>{
        return t.direction == 'In' ? remaining + t.amount : remaining - t.amount;
      },0);
    }
}
