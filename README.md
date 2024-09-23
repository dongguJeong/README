## 9월 23일 백엔드 기초 마무리

- sql 문에 값을 넣고 싶다면 ?를 사용하자

```
 const id = req.params.id;
    const SQL = "SELECT * FROM channels where id = ?";
    conn.query(SQL, id, function (err, results) {
      if (results) {
        res.json(results);
      } else {
        notFoundChannel();
      }
    });
```

- 값을 여러개 넣고 싶다면 배열을 사용하자

```
    const SQL = "INSERT INTO users (name,user_id, sub_num,video_cnt)";
    const VALUES = [name, user_id, 0, 0];
    conn.query(SQL, VALUES, function (err, results) {
        res.status(200).json(results);
    });
```
