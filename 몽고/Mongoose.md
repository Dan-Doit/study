# MONGOOSE 문법



### 아이디 조회

```typescript
async findById(_id: string) {
  return this.productModel.findOne({ _id }).exec();
}
```



### 생성

```typescript
async createProduct(productArgs: CreateProductArgs): Promise<Product> {
	const { product } = productArgs;
	return new this.productModel(product).save();
}
```



### 조회 및 필터

```typescript

async getAllProducts(
  getAllProductsArgs: GetAllProductsArgs,
): Promise<PaginateResult<Product>> {
  const {
  page,
  limit,
  name,
  manufacturerName,
  categories,
} = getAllProductsArgs;
const { MODULE, INVERTER, EQUIPMENT } = ProductCategoryEnum;
return this.productModel.paginate(
  {
    name: {
      $regex: new RegExp(name),
      $options: 'i',
    },
    category: {
      $in: categories ?? [MODULE, INVERTER, EQUIPMENT],
    },
    $and: [
      {
        'manufacturer.name': {
          $regex: new RegExp(manufacturerName),
          $options: 'i',
        },
      },
    ],
  },
  {
    page,
    limit,
    sort: {
      createdAt: -1,
    },
  },
);
}
```



### 수정

```typescript
async updateState(id: string, state: ProductStateEnum) {
  return this.productModel.updateOne(
    { _id: id },
    {
      state,
    },
  );
}
```



### 삭제

```typescript
async deleteByIds(ids: string[]) {
  return this.productModel
    .deleteMany({ _id: ids })
    .then(res => res.deletedCount !== 0);
}
```



### 특정 컬럼 조회

```typescript
async getAllCompanyNameByCategory(
  category: ProductCategoryEnum,
): Promise<Manufacturer[]> {
  return await this.productModel
  .find({
  category,
})
  .populate('manufacturer')
    .exec()
    .then((res) => res.map((product) => product.manufacturer));
}
}
```

