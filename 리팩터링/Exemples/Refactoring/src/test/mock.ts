export const expectTotalMemberBills = {
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

export const expectBillsInfo = {
    '0': { id: 3, memberId: 1, card: 'cat', amount: 780000 },
    '1': { id: 9, memberId: 1, card: 'cat', amount: 2800 },
    '2': { id: 10, memberId: 1, card: 'cat', amount: 650000 },
    '3': { id: 12, memberId: 2, card: 'cat', amount: 332000 },
    '4': { id: 14, memberId: 2, card: 'cat', amount: 250000 },
    '5': { id: 15, memberId: 2, card: 'cat', amount: 1400000 },
    totalAmount: 3414800,
        totalAmountWithOutTax: 3073320
}