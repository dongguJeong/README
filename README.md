## 9월 10일 백엔드 기초 마무리


```jsx
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);

const userRouter = require('./routes/users');
const channelRouter = require('./routes/channels');
app.use("/",userRouter);
app.use("/channels",channelRouter);
```

https://velog.io/@nemo/node-middleware-next

use 함수를 사용하면 use 함수에 들어오는 인자를 미들웨어처럼 사용할 수 있다

미들웨어를 사용하는 이유는 실제 로직이 처리되기 전에 중간 거름망으로 올바른 요청인지 먼저 처리할 수 있기 때문이다

https://inpa.tistory.com/entry/EXPRESS-📚-라우터-Router

`const router = express.Router();`

Router 를 사용하면 라우팅을 보다 간결하게 사용할 수 있다

https://programmingsummaries.tistory.com/340

`module.exports = router;` 는 module 이란 객체의 exports 속성에 router를 추가하는 것이다. 

app.use("/",userRouter);
app.use("/channels",channelRouter);

를 할 때마다 `module.exports` 를 갈아끼우고 있는 것이다