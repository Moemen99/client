export interface Transaction {
    goodID:string;
    transactionID:string;
    transactionDate:string;
    amount: number;
    direction: 'In' | 'Out';
    comment: string;
}
