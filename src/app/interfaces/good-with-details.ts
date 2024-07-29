import { Transaction } from "./transaction";

export interface GoodWithDetails {
    goodID : string;
    goodInitialBalance: number;
    transactions: Transaction[];
}
