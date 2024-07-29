import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsWithIdAndPeriodComponent } from './transactions-with-id-and-period.component';

describe('TransactionsWithIdAndPeriodComponent', () => {
  let component: TransactionsWithIdAndPeriodComponent;
  let fixture: ComponentFixture<TransactionsWithIdAndPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsWithIdAndPeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsWithIdAndPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
