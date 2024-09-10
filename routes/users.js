const express = require('express');
const router = express.Router();

const db = new Map();
db.set('123', {id : '123' , pwd : '123' , name : 'jdg'});
db.set('789', {id : '789' , pwd : '789' , name : 'dddd'});
let idx = 3;

// 로그인
router.post('/login',(req,res) => {
    const {id,pwd} = req.body;

    let hasUserId = false;
    let hasPwdId = false;

    let matchUser;
    db.forEach(user => {
        if(user.id === id){
            hasUserId = true;
            if(user.pwd === pwd){
                hasPwdId = true;
                matchUser = user;
            }
        }
    })
    
    if(hasPwdId && hasUserId){
        res.status(200).json({
            msg : `${matchUser.name}님 환영합니다`
        })
    }
    else{
        if(!hasUserId){
            res.status(404).json({
                msg : '아이디를 확인해주세요'
            }) 
        }
        else if(!hasPwdId){
            res.status(400).json({
                msg : '비밀번호를 확인해주세요'
            }) 
        }
        
    }
});

// 회원가입
router.post('/join',(req,res) => {
    const {id,pwd,name} = req.body;
    let dup = false;
    db.forEach(user => {
        if(user.id === id){
            dup = true;
        }
    });

    if(!id || !pwd || !name) dup = true;

    if(!dup){
        db.set(id,{id,pwd,name});
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

router.route('/users')
.get(
    function(req,res){
        const {userId} = req.body;
        const user = db.get(userId);
    
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
        const {userId} = req.body;
        const user = db.get(userId);
        
        if(user){
            db.delete(userId);
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
);

module.exports = router;

