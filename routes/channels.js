const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router
  .route("/")
  .get((req, res) => {
    const { user_id } = req.body;
    const SQL = "SELECT * FROM channels where user_id = ?";
    if (user_id) {
      conn.query(SQL, user_id, function (err, results) {
        if (results) {
          res.status(200).json(results);
          res.end();
        } else {
          res.status(404).json({ msg: "등록된 채널이 없습니다" });
        }
      });
    } else {
      res.status(400).end();
    }
  })
  .post((req, res) => {
    if (req.body == {}) {
      res.status(400).json({ msg: "입력 값을 확인해주세요" });
    } else {
      const { name, user_id } = req.body;
      if (name && user_id) {
        const SQL = "INSERT INTO users (name,user_id, sub_num, video_cnt) ";
        const VALUES = [name, user_id, 0, 0];
        conn.query(SQL, VALUES, function (err, results) {
          res.status(200).json(results);
        });
      } else {
        res.end();
      }
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    const SQL = "SELECT * FROM channels where id = ?";
    conn.query(SQL, id, function (err, results) {
      if (results) {
        res.json(results);
      } else {
        notFoundChannel();
      }
    });
  })
  .put((req, res) => {
    const id = +req.params.id;
    const channel = db.get(id);
    if (req.body && channel) {
      db.set(id, { ...channel, ...req.body });
      res.status(201).json({
        id,
      });
    } else {
      res.status(400).json({
        msg: `잘못된 요청입니다`,
      });
    }
  })
  .delete((req, res) => {});

function notFoundChannel() {
  res.status(404).json({
    msg: `채널을 찾을 수 없습니다`,
  });
}

module.exports = router;
