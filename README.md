## 기능 추가

* put 요청 보낼 때, 객체 전체를 보낼 필요 없이 수정하고 싶은 사항만 json으로 보내면 수정되게끔 변경
* 전체 조회를 할 때 ,map이나 for each 가 아닌 Array.from 함수를 사용 

```jsx

// 전체 조회
app.get("/youtubers",function(req,res)  {
    if(db.size == 0){
        res.json({msg : '등록된 유튜버가 없습니다'});
    }
    else{
        const youtubers = Array.from(db.values());
        res.json(youtubers);
    }
});

// 내용 수정
app.put("/youtubers/:id" , function(req, res){
    const {id} = req.params;
    const youtuber = db.get(+id);
    if(youtuber === undefined){
        res.json({msg : '정보를 찾을 수 없습니다'});
    }
    else{
    
        db.set(+id,{
            name : req.body.name ? req.body.name : youtuber.name, 
            sub :req.body.sub ? req.body.sub : youtuber.sub , 
            videoNum : req.body.videoNum ? req.body.videoNum : youtuber.videoNum
        });

        res.json({msg : '수정 되었습니다'});
    }
})
````

