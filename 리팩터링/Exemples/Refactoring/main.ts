import { MemberService } from './src/app/6-1/servise';
import { BillService } from './src/app/6-10/service';
import { MemberRepository, ReceiptRepository } from './src/app/6-1/repository';
import { expectTotalMemberBills, expectBillsInfo } from './src/test/mock';
import { shouldBeEqual } from './src/test/test';

const MemberServiceInit = () => {
  const memberRepository = new MemberRepository();
  const receiptRepository = new ReceiptRepository();

  return new MemberService(memberRepository, receiptRepository);
};

const BillServiceInit = () => {
  const receiptRepository = new ReceiptRepository();

  return new BillService(receiptRepository);
};

const memberService = MemberServiceInit();

const billService = BillServiceInit();

console.debug(memberService.findMember(1));

console.log(memberService.totalMemberBills(1));

shouldBeEqual(memberService.totalMemberBills(1), expectTotalMemberBills);

shouldBeEqual(billService.billsInfo('cat'), expectBillsInfo);
shouldBeEqual(billService.billsInfoRefactorByFunction('cat'), expectBillsInfo);
shouldBeEqual(billService.billsInfoRefactorByClass('cat'), expectBillsInfo);
