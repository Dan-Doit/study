## NVM (Node Version Manager)

### 현재 에너지엑스 백엔드 API는 node 버전 (12.16.3) 으로 개발이 되어있습니다.

```bash
# node version 확인하기

$ node -v

# v12.16.3
```

개발시 노드 버전이 다르거나 최신버전으로 설치가 되어있다면 버전을 downgrade시켜 API오류나 나지 않도록 해야합니다.



### NVM을 설치해 주어야합니다.

```bash
$ brew install nvm
```



### 설치가 완료되었다면 다음 환경변수를 다음경로에 설정해주어야합니다.

`~/.zshrc ` 또는 `~/.bash_profile`



1. 편집기를 사용하여 스크립트 추가

```bash
# 편집기를 사용하여 스크립트 추가

$ vi ~/.zshrc

또는

$ vi ~/.bash_profile
```

2. 아래 스크립트를 zshrc (bash_profile) 복사

```bash
# load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

3. 수정된 스크립트 적용

```bash
$ source ~/.zshrc

또는 

$ source ~/.bash_profile
```

4. nvm 버전 확인

```bash
$ nvm --version

# 0.34.0
```

5. 만약 directory 가 없다는 에러가 말생하면 home directory에 `.nvm` 폴더를 만들어 주어야합니다.

```bash
$ mkdir ~/.nvm
```





### NVM 사용하기

- 다음 명령어들로 `node`를 설치 할 수 있습니다.

```bash
# node.js 버전 설치하기
$ nvm install 0.10
$ nvm install v0.1.2
$ nvm install v8

# node 최신 버전 설치 (설치 당시 기준)
$ nvm install node

# node LTS 최신버전 설치
$ nvm install --lts
```



- 다음 명령어들로 `node version`을 관리할 수 있습니다.

```bash
# 설치된 node.js 목록 확인하기
$ nvm ls

# 특정 버전의 node 사용하기
$ nvm use <version>

# 설치할 수 있는 모든 Node 버전 조회 (재미삼아 해보지마세요 겁나많음... 황급히 control C 두드리기)
$ nvm ls-remote

# 현재 사용중인 버전 확인하기
$ nvm current

# node.js 설치 경로 확인하기
$ which node

# 필요없는 node 버전 삭제하기
$ nvm uninstall <version>
```



- 새로운 쉘을 실행할 경우 `node` 버전이 `system` 버전으로 리셋될수 있습니다.
  이를 고정하기 위한 커맨드는 다음과 같습니다.

```bash
$ nvm alias default 8.9.4

# 설치되어 있는 가장 최신버전의 node를 디폴트로 사용하기
$ nvm alias default node
```

​		터미널을 시작하면 앞으로도 Default로 정한 노드가 실행됩니다.