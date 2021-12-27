import {ReceiptRepository} from '../6-1/repository';
import {Bill} from "../../entity";
import {BillsInfoClass} from './bills-info-class'

export class BillService {
    constructor(
        private readonly receiptRepository : ReceiptRepository,
    ){}

    billsInfo = (companyName : string) => {
        const foundBills = this.receiptRepository.findAll();
        const billsByCompany = foundBills.filter((bill : Bill) => bill.card === companyName)
        const totalAmount = billsByCompany.reduce((previousBalance, currentBalance) => {
            return previousBalance + +currentBalance.amount
        },0)
        const totalAmountWithOutTax = totalAmount * 0.9
        return {
            ...billsByCompany,
            totalAmount,
            totalAmountWithOutTax
        };
    }

    // 언제든 convertBillsInfo 를 사용하여 영수증의 원하는 값을 계산하여 불러올수있다.
    billsInfoRefactorByFunction = (companyName : string) => {
        return convertBillsInfo(this.receiptRepository.findByCompany(companyName));
    }

    // 언제든 convertBillsInfo 를 사용하여 영수증의 원하는 값을 계산하여 불러올수있다.
    billsInfoRefactorByClass = (companyName : string) => {
        const foundBills = this.receiptRepository.findByCompany(companyName);
        const billsInfoClass : BillsInfoClass = new BillsInfoClass(foundBills);

        const totalAmount = billsInfoClass.totalAmount();
        const totalAmountWithOutTax = billsInfoClass.billsInfoRefactorByFunction();
        return {
            ...foundBills,
            totalAmount,
            totalAmountWithOutTax
        };
    }
}

const convertBillsInfo = (foundBills) => {
    const bills = {...foundBills}
    bills.totalAmount = foundBills.reduce((previousBalance, currentBalance) => {
        return previousBalance + +currentBalance.amount
    },0)
    bills.totalAmountWithOutTax = bills.totalAmount * 0.9
    return bills
}