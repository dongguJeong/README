const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param } = require("express-validator");

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).end();
  }
};

router
  .route("/")
  .get(
    [body("user_id").notEmpty().isInt().withMessage("숫자"), validate],
    (req, res, next) => {
      const { user_id } = req.body;
      const SQL = "SELECT * FROM channels where user_id = ?";
      conn.query(SQL, user_id, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.length) {
          res.status(200).json(results);
        } else {
          notFoundChannel(res);
        }
      });
    }
  )
  //채널 생성
  .post(
    [
      body("user_id").notEmpty().isInt().withMessage("아이디 확인"),
      body("name").notEmpty().isString().withMessage("이름 확인"),
      validate,
    ],
    (req, res, next) => {
      const { name, user_id } = req.body;
      const SQL =
        "INSERT INTO channels (name,user_id, sub_num, video_cnt) VALUES (?, ?, 0, 0)";
      const VALUES = [name, user_id];
      conn.query(SQL, VALUES, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
    }
  );

router
  .route("/:id")
  .get(
    [param("id").notEmpty().withMessage("id 확인"), validate],
    (req, res) => {
      const { id } = req.params;
      const SQL = "SELECT * FROM channels where id = ?";
      conn.query(SQL, id, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.length) {
          res.status(200).json(results);
        } else {
          notFoundChannel(res);
        }
      });
    }
  )
  // 채널 수정
  .put(
    [
      param("id").notEmpty().withMessage("id 확인"),
      body("name").notEmpty().isString().withMessage("제목 확인"),
      validate,
    ],
    (req, res) => {
      const { id } = req.params;
      const { name } = req.body;
      const SQL = "UPDATE channels SET name=? WHERE id=?";
      const VALUES = [name, id];
      conn.query(SQL, VALUES, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.affectedRows == 0) {
          return res.status(400).end();
        } else {
          res.status(200).json(results);
        }
      });
    }
  )
  .delete(
    [param("id").notEmpty().withMessage("id 확인"), validate],
    (req, res) => {
      const { id } = req.params;
      const SQL = "DELETE FROM channels where id = ?";
      conn.query(SQL, id, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        if (results.affectedRows == 0) {
          return res.status(400).end();
        } else {
          res.status(200).json(results);
        }
      });
    }
  );

function notFoundChannel(res) {
  res.status(404).json({
    msg: `채널을 찾을 수 없습니다`,
  });
}

module.exports = router;
