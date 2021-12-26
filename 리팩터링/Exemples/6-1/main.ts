import {MemberService} from './src/app/6-1/servise';
import {MemberRepository, ReceiptRepository} from './src/app/6-1/repository';
import {shouldBeEqual} from "./src/test/test";

const init = () => {
    const memberRepository = new MemberRepository();
    const receiptRepository = new ReceiptRepository();

    return new MemberService(memberRepository, receiptRepository);
}

const memberService = init();

console.debug(memberService.findMember(1));

// console.debug(findMember(10));
console.log(memberService.totalMemberBills(1));

//  test
shouldBeEqual(memberService.totalMemberBills(1))