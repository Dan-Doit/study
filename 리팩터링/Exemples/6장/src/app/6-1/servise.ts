import {MemberRepository, ReceiptRepository} from './repository';
import {NotFoundException} from '../../data';
import {Bill, Member} from "../../entity";

export class MemberService {
    constructor(
        private readonly memberRepository : MemberRepository,
        private readonly receiptRepository : ReceiptRepository
    ){}

    findMember = (id:number) : Member => {
        return throwMemberNotFound(id, this.memberRepository.findOne(id))
    }

    totalMemberBills = (id:number) : Member => {
        const foundMember = throwMemberNotFound(id, this.memberRepository.findOne(id));
        const memberBills = findMemberBills(id, this.receiptRepository.findAll())
        return memberConverter(foundMember, memberBills)
    }
}

const exchangeWon = (money : number) : string => {
    return money.toLocaleString();
}

const findMemberBills = (memberId :number, bills : Bill[]) : Bill[] => {
    return bills.filter((bill) => memberId === bill.memberId)
}

const totalPaymentConverter = (memberBills : Bill[]) : string => {
    const totalPayment = memberBills.reduce((save, current) => {
        return save + +current.amount
    },0)
    return exchangeWon(totalPayment);
}

const billConverter = (bills : Bill[]) : Bill[] => {
    return bills.map(bill => (
        {
            ...bill,
            amount :  exchangeWon(+bill.amount)
        }
    ))
}

const memberConverter = (member : Member, bills : Bill[]) : Member => {
    return {
        ...member,
        bills : billConverter(bills),
        totalPayment: totalPaymentConverter(bills)
    };
}

const throwMemberNotFound = (id :number, response: Member) : Member => {
    if(!response) {
        throw NotFoundException('MEMBER',id);
    }
    return response;
}