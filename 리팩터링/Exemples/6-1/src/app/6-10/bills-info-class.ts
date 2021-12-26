import {Member, Bill} from '../../entity';

export class BillsInfoClass {
    member : Member;
    bills : Bill[];
    constructor(member : Member, bills : Bill[]){
        this.member = member;
        this.bills = bills;
    }

    memberBillsInfo = (id:number) => {
    }
}