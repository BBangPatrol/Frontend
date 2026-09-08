# Frontend

### 로컬 카카오 로그인

`.env`에 아래 값을 설정하고 `npm run dev`로 실행합니다. 키는 사용 중인 카카오 앱의 REST API 키를 넣습니다.

```dotenv
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=https://bbangpatrol.duckdns.org
VITE_KAKAO_REST_API_KEY=카카오_REST_API_키
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/auth/kakao/callback
```

- 카카오에 등록한 리다이렉트 URI와 백엔드 `KAKAO_REDIRECT_URI`도 위 주소와 같아야 합니다.
- 프론트와 백엔드는 동일한 REST API 키를 사용합니다. Client Secret은 백엔드에만 설정합니다.
- 메인의 로그인 모달 또는 `/login-test`에서 카카오 로그인을 시작합니다.
- 콜백에서 `POST /auth/login` → AT 저장 → `GET /auth/me` → 사용자 정보 저장 → 메인 이동 순서로 처리합니다.
- Redux Persist가 AT와 사용자 정보를 localStorage의 `persist:auth`에 저장합니다. 새로고침 후에도 닉네임이 표시되는지 확인합니다.
- 토큰 자동 재발급은 없습니다. 인증 API가 401을 반환하면 저장된 로그인 상태를 지우므로 다시 로그인합니다.
- 로그아웃 시 서버 로그아웃 API를 호출하고 저장된 로그인 상태를 지웁니다.

### 코드 컨벤션

---

```
- 의미 없는 변수명은 사용하지 않기
  ex) text1, test2

- 변수명과 함수명은 카멜 케이스
  ex) userName, getUserData()

- 컴포넌트 이름은 파스칼 케이스
  ex) LoginForm, UserProfile

- 상수는 대문자 스네이크 케이스
  ex) API_URL, MAX_RETRY_COUNT

- 함수명은 동사로 시작, 이벤트 함수는 handle로 시작
  ex) getUser(), handleSubmit(), fetchPosts()

- 컴포넌트 파일명과 컴포넌트 이름을 동일하게 작성
  ex) LoginForm.jsx → LoginForm

- props 이름은 전달되는 값의 역할이 드러나도록 작성
```

### 파일, 폴더 네이밍 규칙

---

```
- 컴포넌트 파일은 파스칼 케이스
  ex) UserCard.jsx, LoginForm.jsx

- 일반 JavaScript 파일은 카멜 케이스
  ex) formatDate.js, fetchUserData.js

- 폴더 이름은 소문자
  ex) components, hooks, utils

- Custom Hook은 use로 시작
  ex) useUser.js, useModal.js
```

### Git 컨벤션

---

```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제
CHORE:    빌드 업무 수정(ex> dependency 추가)
```

```bash
커밋 타입: 내용 자세히 적어주기 [#지라이슈넘버]
ex) FEAT: 로그인 rest api 추가 [#지라이슈넘버]
```

[Git 스타일 가이드](https://udacity.github.io/git-styleguide/)

### Git Flow 브랜치 전략

---

- Git Flow model을 사용하고, Git 기본 명령어 사용한다.

- Git Flow 사용 브랜치
  - feature - 기능
  - develop - 개발
  - main - 배포
  - hotfix - 급한 에러 수정

- Git Flow 진행 방식
  1. feature 브랜치가 완성되면 develop 브랜치로 pull request를 통해 merge한다.

     ⇒ pull request가 요청되면, 모든 팀원들이 코드 리뷰를 하여 안전하게 merge한다.

  2. 매 주마다 develop 브랜치를 main 브랜치로 병합하여 배포를 진행한다.

- feature 브랜치 이름 명명 규칙
  - feature/[front or back]/[기능 이름]

    ex) feature/front/login
