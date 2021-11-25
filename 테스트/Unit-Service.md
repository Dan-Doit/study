

# Service test에 대하여

---



### 인젝션 주입에 대한 설정을 꼭 해주도록 한다.

@Injection에 대한 정의는 아래와 같이 import문 아래에 정의한다.

```typescript
jest.mock('typeorm-transactional-cls-hooked', () => ({
  Transactional: () => () => ({}),
  BaseRepository: class {},
  IsolationLevel: { SERIALIZABLE: 'SERIALIZABLE' },
}));
```



### Provider 설정을 해준다.

```typescript
providers: [
        NegativeOpinionService, // 테스트 서비스 등록 부분
        {
          provide: getRepositoryToken(Project), // repository 정의
          useValue: {
            findById: jest.fn(projectId =>     // 해당 repository의 함수 정의
              fakeProject.find(project => project.id === projectId),
            ),
          },
          {
          provide: NotificationService,        // 참조되는 service 정의
          useValue: {
        	  createNegativeOpinionNotification: jest.fn(), // 참조되는 서비스의 함수 정의
				  	updateNegativeOpinionNotification: jest.fn(),
							},
					},
      ]
```



### 모킹에대한 정의가 필요하다.

DB Mocking

만약 테스트에 Repository에 대한 테스트가 필요할경우 이렇게 mock DataBase를 만들어서 테스트 해야한다.

```typescript
const fakeNegativeOpinion = [
  { id: 1, contents: 'home coming', epc: { id: 1 }, project: { id: 1 } },
  { id: 2, contents: 'far from home', epc: { id: 1 }, project: { id: 2 } },
];

const fakeProject = [{ id: 1, name: 'spider man' }];

const fakeMember = [{ id: 1, partner: { epc: { id: 1 } } }];
```



Function Mocking

```typescript
{
  provide: getRepositoryToken(Estimate),
    useValue: {
      findByEpcProjectIdForRemove: jest.fn(() => null),
        remove: jest.fn(),
    },
},
```



### 타입에 대한 정의

먼저 타입을 사용하기위해 타입을 정의해준다.

```typescript
export type ProjectMockRepository<T = any> = Partial<
  Record<keyof ProjectRepository, jest.Mock>
>;
```

아래와 같이 타입을 먼저 정해주고 이 Repository를 사용하기 위해 getCustomRepositoryToken을 사용하여 선언한다.

```
projectRepository = module.get(getCustomRepositoryToken(ProjectRepository));
```



### Global 함수에 대한 정의

대표적으로 Date 함수에 대한 정의이다.

```typescript
const mockDate = new Date();

jest
  .spyOn(global, 'Date')
  .mockImplementation(() => (mockDate as unknown) as string);
```



### 서비스의  Unit TEST 작성

Error에 대한 정의

```typescript
    it('존재하지 않는 견적서 정보를 조회할 경우 HttpException NOT_FOUND 에러 반환된다', async () => {
      estimateRepository.findById.mockResolvedValue(undefined);
      try {
        await estimateService.updateEstimate(updateEstimateArgs, memberId);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.status).toEqual(HttpStatus.NOT_FOUND);
        expect(e.response.error).toEqual(
          `Not found by estimateId:${updateEstimateArgs.estimateId}`,
        );
      }
    });
```

Expect에 대한 정의

```typescript
it('처음 생성한 견적서가 있으면 견적서가 업데이트 되어야 한다.', async () => {
      memberRepository.findById.mockResolvedValue(new Member());
      estimateRepository.findById.mockResolvedValue(
        mockEstimateForUpdateEstimateFirstTime,
      );
      itemRepository.create.mockImplementation(args => args);
      projectRepository.findById.mockResolvedValue({ id: 1 });
      jest
        .spyOn(global, 'Date')
        .mockImplementation(() => (mockDate as unknown) as string);
      estimateRepository.getEstimateCountForProject.mockResolvedValue(0);
      const updatedEstimate = await estimateService.updateEstimate(
        updateEstimateArgs,
        memberId,
      );
      expect(estimateTempRepository.remove).toBeCalled();
      expect(estimateHistoryRepository.save).not.toBeCalled();
      expect(itemHistoryRepository.save).not.toBeCalled();
      expect(notificationService.createEstimateNotification).toBeCalled();
      expect(notificationService.submitEstimateNotification).toBeCalled();
      expect(updatedEstimate).toEqual(updateEstimateExpectValues);
    });
```

실행되는 함수의 실행 여부 정의

```typescript
    it('이미 있는 견적서가 있으면 이력을 저장하고 업데이트 되어야 한다.', async () => {
      memberRepository.findById.mockResolvedValue(new Member());
      estimateRepository.findById.mockResolvedValue(updateEstimateExpectValues);
      itemRepository.create.mockImplementation(args => args);
      projectRepository.findById.mockResolvedValue({ id: 1 });
      await estimateService.updateEstimate(updateEstimateArgs, memberId);
      expect(estimateTempRepository.remove).not.toBeCalled();
      expect(notificationService.updateEstimateNotification).toBeCalled();
      expect(estimateHistoryRepository.save).toBeCalled();
      expect(itemHistoryRepository.save).toBeCalled();
    });

```

