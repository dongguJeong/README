const express = require('express');
const app = express();
app.use(express.json());

const db = new Map();
db.set(1, {name : '파카', sub : 700000 , videoNum : 1000});
db.set(2, {name : '랄로', sub : 1000000 , videoNum : 250});

app.get('/',function(req,res)  {
    res.send("main");
});

app.post('/youtubers', function(req,res){

    let dup = false;
    for(const v of db.values()){
        if(v.name === req.body.name){
            dup = true;
            break;
        }
    }

    if(!dup){
        db.set(db.size+1 , req.body);
        res.json({
            msg : `${req.body.name}님, 채널 개설을 환영합니다`
        });
    }
    else{
        res.json({
            msg : `존재하는 채널명입니다`
        });
    }
    
})

app.get("/youtubers",function(req,res)  {
    const youtubers = Array.from(db.values());
    res.json(youtubers)
});

app.get('/youtubers/:id',function(req,res)  {
    const youtuber = db.get(+req.params.id);
    if(youtuber === undefined){
        res.json({msg : '정보를 찾을 수 없습니다'});
    }
    else{
        res.json(youtuber);
      
    }
});

app.get('/watch', function(req,res){

    //객체의 비구조화
    const {v,t} = req.query;
    res.json({
        vidio : v,
        timeline : t
    });
})


app.listen(3000);
