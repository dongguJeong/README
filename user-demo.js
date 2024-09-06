const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000);

const db = new Map();
db.set(1, {id : '123' , pwd : '123' , name : 'jdg'});
db.set(2, {id : '789' , pwd : '789' , name : 'dddd'});
let idx = 3;

app.post('/login',(req,res) => {
    const {id,pwd} = req.body;

    let matchUser;
    db.forEach(user => {
        if(user.id === id && user.pwd === pwd){
            matchUser = user;
        }
    })
    
    if(matchUser){
        res.status(200).json({
            msg : `${matchUser.name}님 환영합니다`
        })
    }
    else{
        res.status(404).json({
            msg : '등록되지 않은 유저입니다'
        }) 
    }
});

// 회원가입
app.post('/join',(req,res) => {
    const {id,pwd,name} = req.body;
    let dup = false;
    db.forEach(user => {
        if(user.id === id){
            dup = true;
        }
    });

    if(!id || !pwd || !name) dup = true;

    if(!dup){
        db.set(idx++,{id,pwd,name});
        res.status(201).json({
            msg : `${name}님 환영합니다`
        })
    }
    else{
        res.status(400).json({
            msg : `id나 pwd를 확인해주세요`
        })  
    }
    
});

app.route('/users/:n')
.get(
    function(req,res){
        const n = req.params.n;
        const user = db.get(+n);
    
        if(user){
            res.status(201).json(user);
        }
        else{
            res.status(404).json({
                msg : '등록되지 않은 유저입니다'
            }) 
        }
    }
)
.delete(
    function(req,res) {
        const n = req.params.n;
        const user = db.get(+n);
        
        if(user){
            db.delete(+n);
            res.status(201).json({
                msg : `${user.id}가 삭제되었습니다`
            })
        }
        else{
            res.status(404).json({
                msg : '등록되지 않은 유저입니다'
            }) 
        }
    }
)
