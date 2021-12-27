export const shouldBeEqual = (data, expectData) => {
    if(JSON.stringify(data) === JSON.stringify(expectData)) {
        console.log('Good')
    }else {
        console.debug('?????????????????????')
        console.warn(data)
        console.warn(expectData)
    }
}