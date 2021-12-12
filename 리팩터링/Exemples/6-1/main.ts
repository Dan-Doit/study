import {findMember, totalMemberBills} from './src/app/servise';
import {shouldBeEqual} from "./src/test/test";


// console.debug(findMember(1));
// console.debug(findMember(10));

console.log(totalMemberBills(1));

// test
shouldBeEqual(totalMemberBills(1))