import {expectTotalMemberBills} from './mock'

export const shouldBeEqual = (data) => {
    if(JSON.stringify(data) === JSON.stringify(expectTotalMemberBills)) {
        console.log('Good')
    }else {
        console.debug('?????????????????????')
        console.warn(data)
        console.warn(expectTotalMemberBills)
    }
}