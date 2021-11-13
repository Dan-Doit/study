# e2e 테스팅에 대하여

---

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { TYPEORM_MODULE_OPTIONS } from '@nestjs/typeorm/dist/typeorm.constants';
import { AppModule } from '@nrgx/app.module';
import { Connection, getConnection, Repository } from 'typeorm';
import * as supertest from 'supertest';
import { getRepositoryToken, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NegativeOpinion } from '@nrgx/components/negative-opinion/entities';
import { AccessAuthGuard } from '@nrgx/auth/guard';
import { bootstrap } from '@nrgx/bootstrap';

function sendRequest(
  agent: supertest.SuperAgentTest,
  query: string,
): supertest.Test {
  return agent.post('localhost:8001/graphql').send({
    operationName: null,
    variables: {},
    query,
  });
}

describe('Negative Opinion (e2e)', () => {
  let app: NestExpressApplication,
    agent: supertest.SuperAgentTest,
    no: Repository<NegativeOpinion>,
    negativeOpinion: NegativeOpinion,
    accessAuthGuard: AccessAuthGuard,
    token: string,
    connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TYPEORM_MODULE_OPTIONS)
      .useFactory({
        inject: [ConfigService],
        factory: (configService: ConfigService): TypeOrmModuleOptions => {
          return {
            type: 'postgres' as 'postgres',
            host: configService.get('database').host,
            port: configService.get('database').port,
            username: configService.get('database').user,
            password: configService.get('database').password,
            database: configService.get('database').db,
            entities: ['dist/**/**/*.entity{.ts,.js}'],
            migrations: ['dist/**/**/*.entity{.ts,.js}'],
            synchronize: configService.get('database').synchronous,
            namingStrategy: new SnakeNamingStrategy(),
            keepConnectionAlive: true,
            cli: {
              migrationsDir: 'src/migrations',
              entitiesDir: 'src/**/**/*.entities{.ts,.js}',
            },
          };
        },
      })
      .overrideGuard(AccessAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    no = module.get<Repository<NegativeOpinion>>(
      getRepositoryToken(NegativeOpinion),
    );
    accessAuthGuard = module.get<AccessAuthGuard>(AccessAuthGuard);
    connection = getConnection();

    app = await module.createNestApplication<NestExpressApplication>();
    app = await bootstrap(app);
    await app.init();
    agent = supertest.agent(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('QUERY › login', async () => {
    const query =
      '{ mutation {\n' +
      '  login(email:"admin" password:"pssword"){\n' +
      '    accessToken\n' +
      '    refreshToken\n' +
      '  }\n' +
      '} }';
    const res = await sendRequest(agent, query).expect(200);
    token = res.body.accessToken;
  });
});

```



구문 해석이 필요하다