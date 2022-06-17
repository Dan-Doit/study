# MONGO 문법



### 모든 DBS 확인하기

```sql
show dbs;
```



### DB 스왑하기

```sql
use development;
```



### 현재 DB 확인하기

```sql
show dbs;
```



### 컬렉션 조회하기

```sql
db.getCollection("products").find().limit(100);
db.getCollection("manufacturers").find({}).limit(100);
db.getCollection("purchase").find({}).limit(100);
```



### 컬렉션 내 키 페어 삭제하기

```sql
db.getCollection("products").updateMany({}, {"$unset": {price: 1}}, false, true);
```



### 컬렉션 키 페어 추가하기

```sql
db.getCollection("products").updateMany({}, {"$set": {minPrice: new NumberLong("1"), maxPrice: new NumberLong("5000000")}})
```



### 컬렉션 특정 키 페어 수정하기

```sql
db.getCollection("products").updateOne({_id: new ObjectId("628dfe3457ae99cb6a7a518d")}, {"$set": {price: new NumberLong("3000000")}})
```

