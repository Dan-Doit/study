# Mongo DB

---

[참조 사이트](https://boying-blog.tistory.com/35)

## 클러스터

일반적인 데이터 베이스의 공간을 말합니다.



## 레플리카 셋 과 샤딩 

몽고 클러스터를 알기 위해선 샤딩과 레플리카 셋의 개념을 알면 좋습니다.


- ### 레플리카 셋

복제 세트 라는 의미인데 두 가지 구조로 되어있습니다. 

1. PSA 구조

2. PSS 구조

P는 Primary S는 Secondary A은 Arbiter 입니다. (본문에서는 PSS 구조)

각각 서버를 의미하고 프라이머리에서 작동이 이루어지다가 프라이머리에 문제가 생기면 세컨더리가 프라이머리가 되는 방식입니다. 

아비터는 프라이머리의 상태를 체크하는 역할을 합니다.

간단하게 말해서 **레플리카 셋**은 **백업**을 만들어 둔다고 보시면됩니다.

- ### 샤딩

**샤딩**은 조각내다 라는 의미의 저장기법으로 세 개의 샤드 클러스터가 있으면 여러 개의 데이터를 세 개의 클러스터에 조각내서 저장하여 분산저장 및 분산처리를 통해 **속도를 증가** 시키기 위한 방법이라고 보시면 될 거 같습니다. 



## 몽고 클러스터

- ### mongos

  라우터의 역할로 사용자가 접속하는 포인트로 쿼리를 받아 config server의 분산 정보를 참조하여 샤드로 전달해 주고 사용자들에게 결과를 리턴해주는 역할

- ### config server 

  샤드 클러스터에서 분산된 샤드 정보를 저장하고 관리

- ### sharded server 

  데이터가 실제 저장되는 곳



## Dokcer - Mongo DB 접속하기

- 생성

  bash 이용하기

  ```bash
  $ docker run --name mongodb-container -v ~/data:/data/db -d -p 27017:27017 mongo
  ```

  Docker-compose 이용하기

  ```json
  version: '3.4' # version 정보를 작성합니다.
  services: # service 목록을 정의합니다.
    mongo: # service의 이름입니다.
      container_name: 'mongo' # container의 name을 정의합니다.
      image: mongo # 해당 service에서 사용할 image입니다.
      restart: always # container를 실행할 때 항상 이미 수행중이라면 재시작을 수행합니다.
      environment: # 환경변수를 정의합니다.
        MONGO_INITDB_ROOT_USERNAME: dan
        MONGO_INITDB_ROOT_PASSWORD: 1234
      volumes: # container -> local로 mount할 수 있습니다.
        - type: bind
          source: ./data/db # local 경로
          target: /data/db # container 내부에서의 경로
      ports: # service port를 정의합니다.
        - '27017:27017' # local:container
  
  ```

- 접속하기

  ```bash
  $ docker exec -it mongodb-container bash
  root@073c229db4e5:/# mongo
  ```

  

