# Go lang 스터디

---



## Go 언어의 관한 내용을 정리합니다.



정적언어는 각 운영체제와 CPU의 환경에 따라 컴파일러의 변환을 다르게 합니다.

Go 언어 또한 이러한 정적언어의 성격을 따라가지만 몇가지 옵션을 주어 쉽게 컴파일이 가능합니다.

2가지 옵션이 주인데 `GOOS ` OS 와 `GOARCH ` 아키텍쳐 설정입니다.

```bash
# 다음 명령어로 Go에서 컴파일 가능한 옵션들을 볼수 있습니다.
$ go tool dist list
```



```bash
# 빌드시 옵션을 줄 수 있다.
$ GOOS=linux GOARCH=amd64 go build
```

