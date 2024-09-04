## 9월 첫 주차 학습 내용 정리

## ExpressJS의 구조

router, handler를 따로 만들 필요 없이 개발 가능

### bin 폴더

www.js 이 있으며 서버 기본 설정이 자바스크립트로 작성되어 있다

### public 폴더

폰트, 이미지 등등이 정적 파일들을 보관한다

- 정적 파일을 쓰는 이유

public 폴더는 **정적 파일을 보관하기에 좋은 장소**이다. 이유는 아래와 같다. public 폴더에 위치한 정적 파일은 빌드 후에 build 폴더에 복사된다. 따라서 빌드 이후에도 파일이 유지되며, 캐싱 문제도 해결할 수 있다.

출처 : https://programmerplum.tistory.com/202

### routes 폴더

: 라우트에 따라 어떤 html을 불러줄지, 혹은 api를 만들 때 사용한다

(routes/index.js)

render 함수를 사용하면 url에 따라 views 폴더에 어떤 html 파일을 불러올지 설정할 수 있다

```jsx
var express = require('express');
var router = express.Router();

// 메인 페이지로 들어오면 views/index.jade를 렌데링 해달라
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

```

(routes/users.js) 

‘/’로 접속했을 때 어떤 api를 보내줄지

```jsx
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

```

### views 폴더

jade를 확장자로 가지고 있으며 html이 적혀 있다

(views/index.jade)

```html

extends layout

block content
  h1= title
  p Welcome to #{title}

```

app.js 폴더

각종 디펜던시가 적힌 package.json, package-lock.json이 있다




## postman 사용하기(express_demo 에서 확인)

#### 수정사항

* 전체 조회 api 추가
* post 시 중복된 채널이름은 db에 추가 안 되도록 기능 수정
* post로 데이터 추가 시 id를 하드코딩으로 지정하는 것이 아닌, db.size+1로 설정하게끔 변경