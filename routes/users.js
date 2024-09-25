const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param } = require("express-validator");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).end();
  }
};

// 로그인
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인"),
    validate,
  ],
  (req, res) => {
    const { email, password } = req.body;
    const SQL = "SELECT * FROM users where email = ?";
    const VALUES = email;
    conn.query(SQL, VALUES, function (err, results) {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const loginUser = results[0];
      if (loginUser && loginUser.pwd === password) {
        //토큰 발급
        const token = jwt.sign(
          {
            email: loginUser.email,
            name: loginUser.name,
          },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "30m",
            issuer: "dong",
          }
        );

        //쿠키
        res.cookie("token", token, {
          httpOnly: true,
        });

        console.log(token);

        res.status(200).json({
          msg: "성공",
          token: token,
        });
      } else {
        res.status(403).json({ msg: "실패" });
      }
    });
  }
);

// 회원가입
router.post(
  "/join",
  [
    body("contact").notEmpty().isString().withMessage("전화번호 확인"),
    body("name").notEmpty().isString().withMessage("이름 확인"),
    body("password").notEmpty().isString().withMessage("비번 확인"),
    body("email").notEmpty().isEmail().withMessage("이메일 확인"),
    validate,
  ],
  (req, res) => {
    const { email, password, name, contact } = req.body;
    const SQL = "INSERT INTO users (email,name,pwd,contact) VALUES (?,?,?,?)";
    const VALUES = [email, name, password, contact];
    conn.query(SQL, VALUES, function (err, results) {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(200).json(results);
    });
  }
);

router
  .route("/users")
  // 개별 조회
  .get(
    [body("email").notEmpty().isEmail().withMessage("이메일 확인"), validate],
    function (req, res) {
      const { email } = req.body;
      const SQL = "SELECT * FROM `users` where email = ?";
      const VALUES = email;
      conn.query(SQL, VALUES, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(200).json(results);
      });
    }
  )
  // 개별 삭제
  .delete(
    [body("email").notEmpty().isEmail().withMessage("이메일 확인"), validate],
    function (req, res) {
      const { email } = req.body;
      const SQL = "DELETE FROM `users` where email = ?";
      const VALUES = email;
      conn.query(SQL, VALUES, function (err, results, fields) {
        if (results.affectedRows == 0) {
          return res.status(400).end();
        } else {
          res.status(200).json(results);
        }
        res.status(200).json({ msg: "성공" });
      });
    }
  );

module.exports = router;
