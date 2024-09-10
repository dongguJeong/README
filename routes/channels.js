const express = require('express');
const router = express.Router();

const db = new Map();
let id = 3;
db.set(1,{title : "좋댓구알" , userId : "jdg"});
db.set(2,{title : "샤샤샤샷" , userId : "dddd"});

router.route('/')
.get((req,res) => {
    const userId = req.params.userId;
   
    if(userId && db.size){
        let channels = [];
        db.forEach(channel => {
            if(channel.userId === userId){
                channels.push(channel);
            }
        });

        if(channels.length){
            res.status(200).json(channels);
        }
        else{
            res.status(400).json({
                msg : `${userId}가 생성한 채널이 존재하지 않습니다`
            })
        }
    }
    else{
        res.status(404).json({
            msg : `로그인이 필요한 페이지 입니다`
        })
    }
})
.post((req,res) => {
    const {title} = req.body;
    if(title){
        let dup = false;
        db.forEach(channel => 
            {
                if(channel.title === title){
                    dup = true;
                } 
            }
        )
        if(dup){
            res.status(400).json({
                msg : `중복된 이름의 채널이 존재합니다`
            })
        }
        else{
            db.set(id++,{...req.body})
            res.status(200).json({
                msg : `${title} 생성`
            }) 
        }
    }
    else{
        res.status(400).json({
            msg : `잘못된 요청입니다`
        })
    }
})


router.route('/:id')
.put((req,res) => {
    const id = +req.params.id;
    const channel = db.get(id);
    if(req.body && channel){
        db.set(id, {...channel, ...req.body});
        res.status(201).json({
            id
        })
    }
    else{
        res.status(400).json({
            msg : `잘못된 요청입니다`
        })
    }
})
.delete((req,res) => {
    const id = +req.params.id;
    const channel = db.get(id);
    if(channel){
        db.delete(id);
        res.status(201).json({
            id
        })
    }
    else{
        notFoundChannel();
    }
})


function notFoundChannel(){
    res.status(404).json({
        msg : `채널을 찾을 수 없습니다`
    })
}

module.exports = router;