const expect = {
    id: 1,
    name: '조단',
    age: 29,
    card: [ 'samsung', 'lotte', 'cat' ],
    bills: [
        { id: 1, memberId: 1, card: 'samsung', amount: '1,452,000' },
        { id: 2, memberId: 1, card: 'samsung', amount: '322,000' },
        { id: 3, memberId: 1, card: 'cat', amount: '780,000' },
        { id: 4, memberId: 1, card: 'lotte', amount: '250,000' },
        { id: 5, memberId: 1, card: 'lotte', amount: '1,400,000' },
        { id: 6, memberId: 1, card: 'samsung', amount: '309,000' },
        { id: 7, memberId: 1, card: 'lotte', amount: '332,000' },
        { id: 8, memberId: 1, card: 'samsung', amount: '55,000' },
        { id: 9, memberId: 1, card: 'cat', amount: '2,800' },
        { id: 10, memberId: 1, card: 'cat', amount: '650,000' },
        { id: 11, memberId: 1, card: 'samsung', amount: '2,340,000' }
    ],
    totalPayment: '7,892,800'
}


export const shouldBeEqual = (data) => {
    if(JSON.stringify(data) === JSON.stringify(expect)) {
        console.log('Good')
    }else {
        console.debug('?????????????????????')
        console.warn(data)
        console.warn(expect)
    }
}