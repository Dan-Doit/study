import {MemberRepository, ReceiptRepository} from '../6-1/repository';
import {NotFoundException} from '../../data';
import {Bill, Member} from "../../entity";

export class MemberService {
    constructor(
        private readonly memberRepository : MemberRepository,
        private readonly receiptRepository : ReceiptRepository
    ){}

    memberBillsInfo = (id:number) => {
        const foundMember = throwMemberNotFound(id, this.memberRepository.findOne(id));
    }
}

const throwMemberNotFound = (id :number, response: Member) : Member => {
    if(!response) {
        throw NotFoundException('MEMBER',id);
    }
    return response;
}