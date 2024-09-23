const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

// 로그인
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const SQL = "SELECT * FROM users where email = ?";
  const VALUES = email;
  conn.query(SQL, VALUES, function (err, results) {
    const loginUser = results[0];
    if (loginUser && loginUser.pwd === password) {
      res.status(200).json({ msg: "성공" });
    } else {
      res.status(404).json({ msg: "실패" });
    }
  });
});

// 회원가입
router.post("/join", (req, res) => {
  if (req.body == {}) {
    res.status(400).json({ msg: "입력 값을 확인해주세요" });
  } else {
    const { email, password, name, contact } = req.body;
    const SQL = "INSERT INTO users (email,name,pwd,contact) VALUES (?,?,?,?)";
    const VALUES = [email, password, name, contact];
    conn.query(SQL, VALUES, function (err, results) {
      res.status(200).json(results);
    });
  }
});

router
  .route("/users")
  // 개별 조회
  .get(function (req, res) {
    const { email } = req.body;
    const SQL = "SELECT * FROM `users` where email = ?";
    const VALUES = email;
    conn.query(SQL, VALUES, function (err, results) {
      res.status(200).json(results);
    });
  })
  // 개별 삭제
  .delete(function (req, res) {
    const { email } = req.body;
    const SQL = "DELETE FROM `users` where email = ?";
    const VALUES = email;
    conn.query(SQL, VALUES, function (err, results, fields) {
      res.status(200).json({ msg: "성공" });
    });
  });

module.exports = router;
