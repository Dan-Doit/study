## 레디스



인메모리(In-Memory) 형태의 Data Structure Store로 오픈소스로 관리되고있다.

다음의 몇가지 데이터 Structure제를 제공한다.

- Strings - key/value 형태
- set - 중복된 데이터 처리
- sorted-set - 순서를 보장하여 데이터 처리
- hashes - 암호화
- list - 순차적 처리
- Hyperloglog
- bitmap
- 등등



## Cache에 대한 정의

나중에 요청올 결과를 미리 저장해두었다가 빠르게 서비스를 해주는것을 의미한다.



### CPU Cache

Core - L1 cache - L2 cache - L3 cache - Momory - Disk 순으로 속도가 빠르다.

그리고 Redis 는 위의 Memory에서 움직인다. 



### Look aside Cache 구조

일반으로 다음과 같은 순서로 진행되면 룩-어사이드 구조라고한다.

1. 클라이언트에서 서버로 요청을 한다.
2. 서버는 DB에서 데이터를 가져오기전에 Cache에 이 연산을 한적이 있는지 확인한다.
3. 결과가 있으면 데이터를 전송하고 없으면 DB에서 데이터를 가져온다.
4. 캐시에는 수행한 결과값이 저장되어있기때문에 DB연산을 거치지 않아도 데이터를 줄수있다.
5. Memory Cache를 이용하게 되면 훨씬 더 빠른 속도로 서비스가 가능하다.



### Write Back 구조

일반적으로 In-Memory에서 읽고 쓰기가 빠르기때문에 다음과 같은 구조가있다.

1. 클라이언트에서 서버로 저장 요청을 한다.
2. 서버는 DB에 저장을 하기전에 이 사항을 Cache에 기록해놓는다.
3. 일정시간이 지나면 Cache에 저장된 요청을 한번에 처리한다.
4. 이경우는 한번에 요청을 하기때문에 한번한번 하는 요청보다 효율이 좋다.
5. 보통 DB에 쓰는 작업이 많을때 유리한 구조이다.
6. 캐시에 데이터를 저장하기때문에 장애가 생길경우 처리해야할 데이터가 날라간다.
7. 따라서 로그 저장등 비교적 중요하지 않는 데이터를 저장할때 유리하다.



### 랭킹서버를 구현한다고 가정할 때

일반 DB로 개발시

- DB에 유저의 Score를 저장하고 Score로 order by로 정렬 후 읽어온다.
- 메모리를 사용하기 때문에 개수가 많아지면 속도에 문제가 발생할수 있다.

Redis로 개발시

- Sorted-set을 이용하면 쉽게 랭킹을 구현 할 수 있다.
- Replication도 가능하다.
- 다음과 같은 용량이든다.
  - id가 1개당 100byte라고 할때
  - 열명의 데이터를 정렬할때 10K가 사용된다.
  - 만명의 데이터를 정렬할때 1M가 사용된다.
  - 천만명의 데이터를 정렬할때 1G가 사용된다.
  - 1조명의 데이터를 정렬할때 1T가 사용된다.



### 어디에 사용하냐

- Remote Data Store
  - A서버, B서버, C서버에서 데이터를 공유하고싶을때
- Redis 자체에서 제공하는 Atomic을 사용하고 싶을때
- 인증 토큰 등을 저장하는 (Strings 또는 hash)
- Ranking 보드로 사용 (Sorted-set)
- 유저 API Limit
- 잡 큐(list)



### Collections

데이터 컬렌션을 잘못짜서 서비스의 속도가 늦어질수 있다.

bigO표기법에 의한 여러가지 컬렉션 공부로 서비스의 효율을 증대시키자.

- Strings

  - 사용법
    - Set <key> <value>
    - Get <key>
    - mset <key1> <value1><key2> <value2>...<keyN> <valueN>
    - mget <key1> <value1><key2> <value2>...<keyN> <valueN>

- List

  - 사용법

    - Lpush <key> <A>
      - Key: (A)
    - Rpush <key> <A>
      - Key: (A,B)
    - Lpush <key> <C>
      - Key: (C, A, B)

    - Lpop <key>
      - Key: (A, B)
    - Rpop <key>
      - Key: (A)

- Set

  - 사용법
    - SADD <key> <value>
      - value가 이미 key에 있으면 추가되지 않는다.
    - SMEMBER <Key>
      - 모든 Value를 돌려준다.
    - SISMEMBER <key> <value>
      - value가 존재하면 1, 없으면 0

- Sorted-sets

  하나의 컬렉션안에 너무 많은 아이템이 들어가면 좋지않다. 만개 이하로 유지하는게 좋다.

  **Expire는 item별로** 걸리지 않고 전체를 삭제하는것이니까 사용시 주의한다.

  - 사용법
    - ZADD <key> <score> <value>
      - value가 이미 key에 있으면 해당 score로 변경된다.
    - ZRANGE <key> <start index> <end index>
      - 해당 index 범위 값을 모두 돌려줌
      - Zrange testkey 0 -1
        - 모든 범위를 가져온다.

### redis 운영법

- 메모리 관리를 잘해야한다.
  - Redis는 In-Memory Data Store 이다.
  - Physical Memory 이상을 사용하면 문제가 발생한다.
    - Swap이 있다면 Swap사용으로 해당 메모리 Page 접근시마다 늦어진다.
  - Maxmemory를 설정하더라도 이보다 더 사용할 가능성이 크다.
    - 메모리 할당과 삭제를 제이말록을 사용하는데 메모리 얼로케이터가 지웠다고 하여도 메모리를 잡고있는경우가 많음
    - 레디스가 측정하는 메모리보다 메모리 파편화 때문에 더많은 메모리가 사용되고 있을수도있다.
  - RSS값을 모니터링을 해야한다.
    - 메모리가 swap하는지 모르고 컴퓨터가 느려졌다고만 판단한다.
  - 큰 메모리를 사용하는 instance 하나보다는 적은 메모리를 사용하는 instance여러개가 안전하다.
    - 레디스에서 읽을때는 괜찮지만 저장시 기존 전체를 포크하는 경우가 있음 그렇기에 24GB짜리 저장시 특수한경우 48GB의 용량을 요구할수도 있음
  - 메모리가 부족할 때는 다음과 같은 방법으로 없앨수 있다.
    - 메모리가 더 많은 장비로 Migration
    - 있는 데이터를 줄이기로 한다.
    - Ziplist를 알아보고 이용하자. 
- O(n) 명령어 사용시 주의하자.
  - 레디스는 Single Threaded이다.
    - 동시에 여러개의 명령을 처리할 수 없다.
    - 참고로 단순한 get/set의 경우, 추당 10만 TPS 이상가능 (CPU속도에 영향을 받는다)



