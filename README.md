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

## 디스트럭처링(비구조화)

### 배열 디스트럭처링(비구조화)

- 대괄호를 사용한다
- 인덱스 순서대로 이루어진다
- 길이가 같을 필요는 없다
- REST 파라미터 사용 가능
- 기본값 설정 가능


```jsx
const [one, two] = [1,2]
console.log(one, two)  // 1  2

const [one, two] = [1,2,3]
console.log(one, two)  // 1  2

// 이게 어떻게 가능할까 -> 희소 배열 !
const [one,,three] = [1,2,3]
console.log(one, three). // 1 3

// 뒤에 것 다 받아오고 싶다면 REST 파라미터를 사용하자
const [one,two,...아몰랑] = [1,2,3,4,5,6,7,8,9,10];
console.log(아몰랑); // [3,4,5,6,7,8,9,10]

// REST 파라미터는 맨 마지막에 사용해주자 => 중간에 사용하면 에러 발생
const [one,two,...아몰랑,마지막] = [1,2,3,4,5,6,7,8,9,10];
console.log(마지막); // Uncaught SyntaxError: Rest element must be last element

// 기본값 할당
const [one,two,three=3] = [1,2];
console.log(three) // 3 

//이미 값이 할당되어 있다면 기본값은 무시됨
const [one,two,three=3] = [1,2,10];
console.log(three) // 10 
```

### 객체 디스트럭처링

- 중괄호를 사용한다
- 순서는 상관없다
- 이름 재설정 가능
- 할당도 가능
- 중첩되어 있어도 원하는 것만 쏙 빼낼 수 있다

```jsx

const book = {
    title : "원피스",
    price : 5000,
    description : '해적왕'
}

const {title, price, description} = book;
console.log(title) // '원피스'
console.log(price) // 5000
console.log(description) // '해적왕'

// 순서가 바뀌어도 된다
const { price, title} = book;
console.log(title) // '원피스'
console.log(price) // 5000

```

#### 이름바꾸기

```jsx
const {title : 제목, price : 가격} = book;
console.log(제목); // 원피스
console.log(가격) // 5000
```

#### 기본값 설정

```jsx
const {title, price, description, 완결 = false} = book;
console.log(완결) // false
```

(마찬가지로 할당된 값이 있다면 기본값은 무시된다)

```jsx
const {title, price, description ='개노잼'} = book;
console.log(description); // 해적왕
```

#### 중첩된 객체

```jsx
const book = {
    title : "원피스",
    price : 5000,
    description : '해적왕',
    character : {
     루피 : '선장',
     조로 : '부선장',
     상디 : '요리사'
    }
}

const {character : {루피} } = book;
console.log(루피) // 선장 
```

## 자료구조 Map

키와 값의 쌍으로 이루어진 컬렉션(키값의 중복을 허용하지 않는다)

### 객체와의 차이점

- 키값의 형태의 제한이 없다
- 이터러블하다
- length 대신 size를 사용하며, size는 인위적인 수정이 불가능하다

키와 값의 쌍으로 이루어진 컬렉션(키값의 중복을 허용하지 않는다)

````jsx
const map = new Map(); // 빈 Map 생성


const map2 = new Map([['key1','value1'], ['key2','value2']]);
console.log(map2); 

const map3 = new Map(['key1','value1']); // 오류
const map3 = new Map([['key1', 'value1']]); // 정상 작동

console.log(map2.size); // 크기 확인 

map2.set('key3','value3'); // 값 추가 
map2.set('key4','value5').set('key6','value6'); // 체이닝 가능

const map7 = new Map(); // 객체도 추가 가능
const aa = { name : 'aa' };
const bb = { name : 'bb' };

map7.set(aa,'aaa').set(bb,'bbb');
console.log(map7); 
//Map(2) { { name: 'aa' } => 'aaa', { name: 'bb' } => 'bbb' }

// 값 불러오기
console.log(map7.get(aa)); // aaa
console.log(map7.get('cc')); // undefined

// 삭제
map2.delete('key3');
console.log(map2);
map2.delete('key1').delete('key2') ; // 오류
map2.get('cc'); // undefined

```

## postman 사용하기(express_demo 에서 확인)

#### 수정사항

* 전체 조회 api 추가
* post 시 중복된 채널이름은 db에 추가 안 되도록 기능 수정
* post로 데이터 추가 시 id를 하드코딩으로 지정하는 것이 아닌, db.size+1로 설정하게끔 변경