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



