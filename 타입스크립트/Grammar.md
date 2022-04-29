### CLASS에서 모든 프로퍼티 정보 가져오기

어떤 클래스에 있는 모든 프로퍼티 key값을 가져와야 할 경우가 있습니다.

이런 경우 타입스크립트에서는 다음과 같이 값을 얻을수 있습니다.

```typescript
class Test {
    constructor (){
        const a = this.a
        const b = this.b
    }
    a() {
        return 'a'
    }

    b() {
        return 'b'
    }
}

const test = new Test();
console.log(test)

const proto = Object.getPrototypeOf(test)
console.log(proto)

const properties = Object.getOwnPropertyNames(proto)
console.log(properties)
```

**결과**

```typescript
[LOG]: Test: { } // 실제로는 __proto__: {...} 값이 숨겨져 있습니다.
[LOG]: { } // 실제로는 __proto__ 값이 숨겨져 있습니다.
[LOG]: ["constructor", "a", "b"] // 모든 프로퍼타입이 배열로 담깁니다.
```

