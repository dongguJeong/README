## 9월 13일 백엔드 기초 마무리

* mysql workspace 를 사용하면 gui로 db를 조작할 수 있다
* 테이블의 속성을 수정하고 싶다면
```sql
ALTER TABLE users MODIFY id INT AUTO_INCREMENT
```

컬럼을 추가하고 싶다
```sql
ALTER TABLE posts ADD COLUMN updated_at DATETIME DEFAULT NOW()
```

한국 시간으로 수정하기
```sql
SET time_zone = 'Asia/Seoul' ;
```

```jsx
datestring : true,
```