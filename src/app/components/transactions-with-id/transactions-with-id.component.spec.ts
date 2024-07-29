import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsWithIdComponent } from './transactions-with-id.component';

describe('TransactionsWithIdComponent', () => {
  let component: TransactionsWithIdComponent;
  let fixture: ComponentFixture<TransactionsWithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsWithIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
