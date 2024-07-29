import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GoodWithDetails } from 'src/app/interfaces/good-with-details';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-transactions-with-id-and-period',
  templateUrl: './transactions-with-id-and-period.component.html',
  styleUrls: ['./transactions-with-id-and-period.component.css']
})


export class TransactionsWithIdAndPeriodComponent implements OnInit {

  filterForm! : FormGroup;
  filteredTransactions : GoodWithDetails[]=[];

  totalTransactions: number = 0;
  totalInAmount: number = 0;
  totalOutAmount: number = 0;
  remainingAmount: number = 0;

  constructor(private fb:FormBuilder,private _goodService:GoodsService){}

  ngOnInit(): void {
    this.filterForm =this.fb.group({
      goodID:['',[
        Validators.required,
        Validators.pattern('^[0-9]{4}$'),
        this.goodIdRangeValidator
        
      ]],
      startDate:['',
        Validators.required
      ],
      endDate:['',
        Validators.required
      ],

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
      console.log(this.filterForm.value);
      
      const goodId = this.filterForm.get('goodID')?.value;
      const startDate = this.filterForm.get('startDate')?.value;
      const endDate = this.filterForm.get('endDate')?.value;

      this._goodService.getFilteredTransactionswithIdAndPeriod(goodId,startDate,endDate)
      .subscribe({
                    next: data =>{this.filteredTransactions =data;this.calculateSummary() },
                    error: error =>{console.error('Error fetching filtered transactions:',error)}
                });
    }else{
      this.filterForm.markAllAsTouched();
    }
    
  }
  calculateSummary(){
    this.totalTransactions=0;
    this.totalInAmount=0;
    this.totalOutAmount=0;
    this.remainingAmount=0;

    this.filteredTransactions.forEach(good=>{
      this.remainingAmount += good.goodInitialBalance;
      good.transactions.forEach(transaction => {
        this.totalTransactions++;
        if(transaction.direction === 'In'){
          this.totalInAmount +=transaction.amount;
          this.remainingAmount +=transaction.amount;
        }else{
          this.totalOutAmount +=transaction.amount;
          this.remainingAmount -=transaction.amount;
        }
      });
    });
  }
  get f() { return this.filterForm.controls; }
}