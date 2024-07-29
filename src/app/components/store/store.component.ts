import { GoodsService } from 'src/app/services/goods.service';
import { Store } from './../../interfaces/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  stores : Store[] = [];

  

  constructor(private _goodsService : GoodsService) {}
  ngOnInit(): void {
    this.loadStores();
  }

  loadStores():void
  {
    this._goodsService.getStore().
    subscribe
    ({
      next: (data) => {this.stores = data; /*console.log(data);*/ },
      error: (error) => {console.error('Error fetching stores:', error);}
    })
  }
}
