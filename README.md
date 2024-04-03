# 헬스인톡

## 프로젝트 소개

### 개발 목적
- 헬스를 처음 접하는 사람들 또는 혼자 헬스를 하는 사람들이 쉽고 올바른 방식으로 헬스를 이용할 수 있도록 정보 제공 및 여러 사람과 운동 방식 소통 & 공유를 통한 다양한 운동법을 접할 수 있는 공간 마련하기 위함

### 참여 인원
- 팀 **꼬**리의 **꼬**리를 무는 **헬**스 이야기(김광민, [김형준](https://github.com/mikejigglypuff), [오성훈](https://github.com/castlehuni))

### 개발 기간
- 1차 개발 기간 23.03 ~ 23.06
- 최종 개발 기간 23.09 ~ 24.02

### 사이트 경로
- [헬스인톡](healthintalk.duckdns.org) 

## 구현 기능
추후 구현 화면 추가 예정

### 사용자 관련 기능
- 회원가입

  아이디 중복 확인 버튼 클릭 시 해당 아이디가 DB상에 존재하는지에 대한 여부 전송

  이메일 인증 버튼 클릭 시 해당 주소로 인증번호 발송

  인증번호가 일치하면 토큰 발급

  회원의 비밀번호는 해시 알고리즘을 거친 후 DB에 저장

- 로그인

  사용자가 입력한 비밀번호를 해시한 값이 DB상에 저장된 비밀번호와 일치하는지 확인하는 구조

  로그인이 성공하면 서버에 세션 생성 후 클라이언트에 해당 세션을 가리키는 쿠키 발급

  쿠키로 로그인 여부를 확인해 헤더의 드롭다운 메뉴를 변경함

- 로그아웃

  로그아웃 시 발급받은 쿠키를 삭제함
  
- 아이디 찾기 & 비밀번호 변경

  회원가입과 마찬가지로 이메일 인증 후 토큰 발급

  비밀번호의 경우 아이디와 같이 직접 반환하면 유출되는 문제가 발생할 수 있으므로 새 비밀번호를 입력하도록 함

- 회원정보 수정

- 회원탈퇴

  회원탈퇴 시 자동으로 로그아웃 처리되도록 함

- 헬스 다이어리 조회 및 작성

  자신의 다이어리만 조회 가능

  매일 인바디를 잴 수는 없으므로 그 날의 몸무게, 운동 부위 정도만 필수로 입력하도록 함

  날짜를 선택하면 해당 날짜의 다이어리로 기록되도록 할 수 있음

  예: 깜빡하고 어제의 운동을 기록하지 못한 경우 날짜를 어제로 선택한 후 다이어리 작성해도 됨


### 커뮤니티 관련 기능
- 게시글 & 댓글 조회

  각 게시판의 글 및 댓글들은 로그인하지 않아도 조회할 수 있음

- 게시글 작성 & 수정

  게시글에 이미지를 첨부할 경우 서버 스토리지에 이미지가 저장되며 해당 이미지에 접근할 수 있는 url이 게시글 DB상에 저장됨

  게시글 이미지 수정 시 기존 이미지는 스토리지 상에서 삭제하고 새 이미지를 저장

- 게시글 추천

  회원 당 1번씩만 가능하며 다시 클릭할 경우 추천이 취소됨

- 게시글 삭제

  게시글을 삭제할 경우 해당 게시글에 첨부된 이미지 파일도 서버 스토리지에서 삭제됨

- 댓글 작성 & 수정 & 삭제

### 기타 기능

카카오맵 헬스장 검색
bmi 계산기
**오**늘의 **운**동 **추**천


## 진행한 문서 작업

- [프로젝트 작업 관리](https://hypnotic-smoke-0d2.notion.site/3ce9d5c6bc644660850f46176c6e64bf?v=c2bb2aefd70f4a3380fb3342bddeec19&pvs=4)
- [API 문서](https://hypnotic-smoke-0d2.notion.site/API-a69e1f251feb4954bb98ae3addc15c43?pvs=4)

## 설치 방법

- TLS 인증서가 요구됨
  
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
```
config.json
{
  development: {
    "username": [DB 사용자],
    "password": [DB 패스워드],
    "database": [DB 이름],
    "host": [DB 호스트],
    "port": [DB 포트],
    "dialect": [DB 종류],
    "httpPort": [http 포],
    "httpsPort": [https 포트],
    "key": [인증서 key 경로],
    "cert": [인증서 cert 경로],
    "ca": [인증서 ca 경로],
  }
}

mail.json
{
  "service": [사용할 메일 서비스],
  "user": [메일 계정 아이디],
  "pass": [메일 계정 패스워드],
  "port": [메일 서비스가 지원하는 포트]
}

session.json
{
  "key": [세션 키],
  "salt": [salt 값],
  "iterations": [해시 반복 횟수],
  "len": [해시값 길이],
  "hash": [사용할 hash 알고리즘]
}
```

```
npm start
```

## 라이센스
이 프로젝트는 [MIT License](https://opensource.org/license/MIT)에 따라 사용이 허가됩니다.
