import {Bill} from '../../entity';

export class BillsInfoClass {
    bills : Bill[];
    constructor(bills : Bill[]){
        this.bills = bills;
    }

    billsInfo = () : Bill[] => {
        return this.bills;
    }

    totalAmount = () : number => {
        return this.bills.reduce((previousBalance, currentBalance) => {
            return previousBalance + +currentBalance.amount
        },0)
    }

    billsInfoRefactorByFunction = () : number => this.totalAmount() * 0.9
}