import {ReceiptRepository} from '../6-1/repository';
import {Person} from "../../entity";

export class BillService {
    person : Person
    constructor(
        private readonly receiptRepository : ReceiptRepository,
    ){
        this.person = {
            name : 'Dan',
            location : 'Incheon',
            position : 'CTO',
        }
    }

    
}