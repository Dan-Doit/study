import {MemberRepository,ReceiptRepository} from './repository';
import {NotFoundException} from '../data';
import {Bill, Member} from "../entity";


export const findMember = (id:number) : Member => {
    const memberRepository : MemberRepository = new MemberRepository();

    const foundMember = memberRepository.findOne(id);
    if(!foundMember) throw NotFoundException('MEMBER',id);
    return foundMember;
}

export const totalMemberBills = (id:number) : Member => {
    const memberRepository : MemberRepository = new MemberRepository();
    const receiptRepository : ReceiptRepository = new ReceiptRepository();

    const foundMember = memberRepository.findOne(id);
    if(!foundMember) throw NotFoundException('MEMBER', id);

    const foundBills = receiptRepository.findAll()

    // 한사람이 얼마나 사용했는지 알아보자
    let newBills : Bill[] = []
    let totalPayment : number  = 0;
    for (let i in foundBills) {
        // new bills 에 해당하는 고객의 가격 추가
        if(id === foundBills[i].memberId) {
            // 고객의 카드 사용 내역 추가
            newBills.push(
                {
                    ...foundBills[i],
                    // 돈에 세자릿수 컴마 찍어주기
                    amount : foundBills[i].amount.toLocaleString()
                }
            )
            // 고객의 지출 비용 합계 구하기
            totalPayment += +foundBills[i].amount;
        }
    }

    return {
        ...foundMember,
        bills : newBills,
        totalPayment:totalPayment.toLocaleString()
    };
}