import {memberList, billsList} from '../../data'
import {Member, Bill} from '../../entity';

export class MemberRepository {
    findOne (id:number) : Member {
        return memberList.find(m => m.id === id);
    }
}

export class ReceiptRepository {
    findAll () : Bill[] {
        return billsList
    }

    findByCompany (companyName : string) : Bill[] {
        return billsList.filter((bill : Bill) => bill.card === companyName)
    }
}