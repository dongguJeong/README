const express = require('express');
const app = express();
app.use(express.json());
app.listen(7777);

const db = new Map();
let id = 2;
db.set(1,{title : "좋댓구알"});
db.set(2,{title : "샤샤샤샷"});

app.route('/channels')
.get((req,res) => {
    const arr= Array.from(db.values());
    res.status(200).json(arr);
})
.post((req,res) => {
    const {title} = req.body;
    if(title){
        db.set(id++,title);
        res.status(201).json({
        msg : `${title} 생성`
        })
    }
    else{
        res.status(400).json({
            msg : `잘못된 요청입니다`
        })
    }
    
    
})


app.route('/channels/:id')
.get((req,res) => {
    const id = +req.params.id;
    const channel = db.get(id);
    if(channel){
        res.status(201).json({
            channel
        })
    }
    else{
        res.status(404).json({
            msg : `찾을 수 없습니다`
        })
    }
})
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
        res.status(400).json({
            msg : `잘못된 요청입니다`
        })
    }
})