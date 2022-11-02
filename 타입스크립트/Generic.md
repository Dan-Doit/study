# TypeScript Generic

타입스크립트에서 타입 코드의 중복 및 재사용을 방지하고 더 편리하게 타입을 지정하게 하는 하나의 component function 입니다.

---



## 제네릭

먼저 제네릭에 대해서 알아볼 필요가 있습니다.

먼저 다음 코드를 보겠습니다. 

```typescript
function noTypeFunction (arg: any): any {
  return arg
}
```

이 함수는 엄청나게 자유롭습니다.

어떤 값도 `arg` 타입으로 넘어올수 있도록 `any` 타입을 사용했기 때문입니다.

이 함수의 단점중에 하나는 다음과 같을때 발생합니다.

```typescript
const num : number = 1;
const result = noTypeFunction(num);

result; // 타입이 any
```

분명히 `number` 타입의 데이터를 넣었음에도 불과하고 모든 값의 결과를 `any` 타입으로 추론합니다.

우리가 원하는 결과는 넣은 `arg`의 `type`을 바탕으로 그 결과 값도 추론되길 원합니다.

이때 우리는 제네릭을 사용하여 이 값을 추론할 수 있습니다.

```typescript
function typeFunction<Type>(arg: Type): Type {
  return arg
}
```

```typescript
const num : number = 1;
const result = typeFunction(num);

result; // 타입이 number
```

이런식으로 제네릭은 타입을 정의하고 추론하고 변형하고 정리하는데 매우 효율적입니다.



## 유틸리티 제네릭

TypeScript는 일반적인 타입 변환을 쉽게 하기 위해서 몇 가지 유틸리티 타입을 제공합니다. 

이러한 유틸리티는 전역으로 사용 가능합니다.



### `Partial<T>`

`Partial`은 이렇게 정의되어있습니다.

```typescript
type Partial<T> = {    
  [P in keyof T]?: T[P];
};
```

이 제네릭은 선택된 `T` 집합의 모든 프로퍼티를 선택적 타입으로 생성합니다.

```typescript
interface User {
  id: number;
  age: number;
}

interface Post {
	title: string;
  contents: string;
}

type Blog = User & Partial<Post> // Partial 사용으로 Post의 프로퍼티를 optional하게 만듭니다.
```

이렇게 하면 Blog 에는 기존타입을 유지한채 Post 부분의 모든을 Optional 하게 가져갈 수 있습니다.

즉 이런식으로 타입이 생성되었겠네요.

```typescript
type Blog = {
    id: number;
    age: number;
    title?: string;  // optional 한 타입
    contents?: string; // optional 한 타입
}
```





### `Required<T>`

`Required`은 이렇게 정의되어있습니다.

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P]; // - 연산자로 ? 를 제거합니다.
};
```

이 제네릭은 Partial 과는 반대이며 `T` 집합의 모든 프로퍼티를 필수로 설정한 타입을 생성합니다.

```typescript
interface User {
  id: number;
  age?: number;
  phone?: string;
}

interface Post {
	title: string;
  contents: string;
}

type UserInfo = Required<User> & Post; // Required 사용으로 User의 모든 프로퍼티를 필수로 만듭니다.
```

이렇게 하면 UserInfo 에는 기존타입을 유지한채 User 부분의 모든을 필수값으로 가져갈 수 있습니다.

즉 이런식으로 타입이 생성되었겠네요.

```typescript
type UserInfo = {
    id: number;
    age: number;   // 필수 처리되었습니다.
    phone: string; // 필수 처리되었습니다.
    title: string;
    contents: string;
}
```



### `Readonly<T>`

`Readonly`은 이렇게 정의되어있습니다.

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

이 제네릭은 `T` 집합의 모든 프로퍼티를 readonly로 설정한 타입을 생성합니다.

즉 참조만 가능하도록 변경불가의 상태로 만들게 됩니다.

```typescript
interface User {
  id: number;
  age?: number;
  phone?: string;
}

type ReadUser = Readonly<User>;

const newUser: ReadUser = {
    id: 1,
}

newUser.id = 2   // Error: read-only 프로퍼티에 id를 할당할수 없습니다.
newUser.age = 25 // Error: read-only 프로퍼티에 id를 할당할수 없습니다.
```





### `Record<K, T>`

`Record`은 이렇게 정의되어있습니다.

```typescript
type Record<K, T> = {
    [P in K]: T;
};
```

이 제네릭은 `K` 의 키(key)값으로 `T` 의 타입(type)을 만들수 있습니다.

```typescript
interface PlzRecordMe {
  name: string;
  vlaue?: number;
}

interface Coupon {
    promotion: string;
    point: string;
}

const potatoPromotion: Record<keyof Coupon, PlzRecordMe> = {
    promotion:{
        name:'알싸한 감자 이벤트'
    },
    point:{
        name: '감자 구매',
        vlaue: 10000
    }
}
```





### `Extract<T, U>`

`Extract`는 이렇게 정의되어있습니다.

```typescript
type Extract<T, U> = T extends U ? T : never;
```

이 제네릭은 `T` 의 모든 프로퍼티 중에 `U` 값을 할당할수 있는 프로퍼티의 **리터럴** 타입을 반환합니다.

`Exclude`와 반대이며 서로 중복되는 것만 반환한다고 생각해도 거의 맞습니다.

```typescript
type Name = Extract<'id' | 'name', 'name'> // type 은 'name'
```

```typescript
interface User {
  id: number;
  age: number;
  name: string;
}

type Name = Extract<keyof User, 'name'>   // type 은 'name'
```



### `Exclude<T, U>`

`Exclude`는 이렇게 정의되어있습니다.

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

이 제네릭은 `T` 의 모든 프로퍼티중 `U` 의 프로퍼티를 제외한 나머지 프로퍼티의 **리터럴** 타입을 반환합니다.

```typescript
type Id = Exclude<'id' | 'age', 'name'>    // type 은 'id'
```

```typescript
interface User {
  id: number;
  age: number;
  name: string;
}

type Id = Exclude<keyof User, 'age' | 'name'> // type 은 'id'
```





### `Pick<T, K>`

`Pick`는 이렇게 정의되어있습니다.

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

이 제네릭은 `T` 프로퍼티로부터 원하는 `K` 프로퍼티를 찾아 타입을 **재구성**합니다.

```typescript
interface Post {
    id: number;
    age: number;
    name: string;
    title: string; 
    contents: string;
}

type Blog = Pick<Post, 'title' | 'contents'> 
// type 은 아래와 같습니다.
// Blog = {
//    title: string;
//    contents: string;
// }

const blog: Blog = {
    title: '제목',
    contents:'컨텐츠'
}
```



`Extract` 제네릭과 비슷하지만 **타입을 재구성하는지, key 타입이 반환**되는지의 차이가 있습니다.

타입을 재 구성하기 때문에 리터럴 타입으로는 정의 할수 없습니다.

```typescript
type Blog = Pick<'id' | 'title' | 'contents', 'title' | 'contents'>  // Error 발생
```





### `Omit<T, K>`

`Omit` 은 이렇게 정의되어있습니다.

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

이 제네릭은 모든 `T` 프로퍼티에서 `K` 를 제외한 나머지 프로퍼티를 재구성합니다.

```typescript
interface Post {
    id: number;
    age: number;
    name: string;
    title: string; 
    contents: string;
}

type Blog = Omit<Post, 'id' | 'age' | 'name'> 
// type 은 아래와 같습니다.
// Blog = {
//    title: string;
//    contents: string;
// }

const blog: Blog = {
    title: '제목',
    contents:'컨텐츠'
}
```



`Exclude` 제네릭과 비슷하지만 **타입을 재구성하는지, key 타입이 반환**되는지의 차이가 있습니다.

타입을 재 구성하기 때문에 리터럴 타입으로는 정의를 하면 원하지 않는 복잡한 타입이 생성됩니다.

```typescript
type Blog = Omit<'id' | 'title' | 'contents', 'id'>  // 타입이 이상하게 정의됩니다.
// type Blog = {
//    [x: number]: string;
//    [Symbol.iterator]: () => IterableIterator<string>;
//    toString: () => string;
//    ...
```





### `NonNullable<T>`

`NonNullable`는 이렇게 정의되어있습니다.

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

이 제네릭은 모든 `T` 프로퍼티중에서 `null`, `undefined` 를 제외하고 나머지 타입을 반환합니다.

```typescript
type NotNullType = NonNullable<string | number | undefined>;
// type 은 string | number
```





### `ReturnType<F>`

`ReturnType`는 이렇게 정의되어있습니다.

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

이 제네릭은 함수(function) `F` 의 리턴되는 타입을 반환합니다.

```typescript
type Fn = ReturnType<() => number>  // type 은 'number'
```

```typescript
interface User {
    id: number;
    name: string;
    age: number;
}

function makeUser(user:User) :User {
    return user
}

type resultUserType = ReturnType<typeof makeUser>   // type 은 'User'
```

이때 추론이 가능하면 타입을 리턴하지만 추론이 되지 않는다면 `any` 타입을 리턴합니다.