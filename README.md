# 헬스인톡


## 프로젝트 소개

### 개발 목적
- 헬스를 처음 접하는 사람들 또는 혼자 헬스를 하는 사람들이 쉽고 올바른 방식으로 헬스를 이용할 수 있도록 정보 제공 및 여러 사람과 운동 방식 소통 & 공유를 통한 다양한 운동법을 접할 수 있는 공간 마련하기 위함

### 참여 인원
- 팀 **꼬**리의 **꼬**리를 무는 **헬**스 이야기(김광민, 김형준, 오성훈)

### 개발 기간
- 1차 개발 기간 23.03 ~ 23.06
- 최종 개발 기간 23.09 ~ 24.02

### 사이트 경로
- [헬스인톡](healthintalk.duckdns.org) 

## 구현 기능
추후 작성 예정


## 설치 방법

- SSL 인증서가 요구됨
  
```
git clone
cd server
npm install
cd ../resources/frontend
npm run build
cd ../../server
mkdir config
```

아래와 같이 형식에 맞춰 JSON 파일 작성

config.json

mail.json

session.json

salt.json

```
npm start
```

## 라이센스
이 프로젝트는 [MIT License](https://opensource.org/license/MIT)에 따라 사용이 허가됩니다.
