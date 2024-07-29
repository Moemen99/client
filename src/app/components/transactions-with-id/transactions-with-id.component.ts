import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GoodWithDetails } from 'src/app/interfaces/good-with-details';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-transactions-with-id',
  templateUrl: './transactions-with-id.component.html',
  styleUrls: ['./transactions-with-id.component.css']
})
export class TransactionsWithIdComponent implements OnInit {

  filterForm! : FormGroup;
  filteredTransactions : GoodWithDetails[] = [];

  totalTransactions: number = 0;
  totalInAmount: number = 0;  // Total amount for 'in' transactions
  totalOutAmount: number = 0; // Total amount for 'out' transactions
  remainingAmount: number = 0;

  constructor(private fb:FormBuilder,private _goodService:GoodsService){}

  ngOnInit(): void {

    this.filterForm =this.fb.group({
      goodID:['',[
        Validators.required,
        Validators.pattern('^[0-9]{4}'),
        this.goodIdRangeValidator
      ]],
    });
  }

  goodIdRangeValidator(control: AbstractControl): ValidationErrors | null{
    const value = control.value;
    if(value && (parseInt(value)< 5401 || parseInt(value)>5406)){
      return {'outOfRange' : true};
    }
    return null;
  }

  onSubmit(){
    if(this.filterForm.valid){
      const goodId= this.filterForm.get('goodID')?.value;
      console.log('Filters',this.filterForm.value);
      this._goodService.getFilteredTransactionswithId(goodId).subscribe({
        next:data => {this.filteredTransactions = data;console.log('Filtered Good:' ,this.filteredTransactions); this.calculateSummary()},
        error: error =>{console.error('Error fetching filtered transactions:', error);}
    })
    }else{
      this.filterForm.markAllAsTouched();
    }
  }

  get f() {return this.filterForm.controls;}

  calculateSummary(): void {
    this.totalTransactions = 0;
    this.totalInAmount = 0;
    this.totalOutAmount = 0;
    this.remainingAmount = 0;

    this.filteredTransactions.forEach(good => {
      this.remainingAmount += good.goodInitialBalance; // Adjusting the initial balance
      good.transactions.forEach(transaction => {
        this.totalTransactions += 1;
        if (transaction.direction === 'In') {
          this.totalInAmount += transaction.amount;
          this.remainingAmount += transaction.amount;
        } else {
          this.totalOutAmount += transaction.amount;
          this.remainingAmount -= transaction.amount;
        }
      });
    });
  }
}
