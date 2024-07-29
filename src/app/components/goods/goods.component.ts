import { Component } from '@angular/core';
import { Good } from 'src/app/interfaces/good';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent {

goodsList :Good[]=[];

constructor(private _goodsService: GoodsService) {}

ngOnInit():void{
  this.loadGoods();
}

loadGoods():void{
  this._goodsService.getGoods().
  subscribe(
    { 
      next: (data)=>{this.goodsList = data;},
      error: (error)=>{ console.error('Error fetching good',error);}
    }
          );
}
}
