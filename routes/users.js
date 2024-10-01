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
      if (loginUser && loginUser.password === password) {
        //토큰 발급
        const token = jwt.sign(
          {
            email: loginUser.email,
          },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "30m",
            issuer: "JWT",
          }
        );

        //쿠키
        res.cookie("token", token, {
          httpOnly: true,
        });

        console.log(token);

        res.status(200).json({
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
    body("password").notEmpty().isString().withMessage("비번 확인"),
    body("email").notEmpty().isEmail().withMessage("이메일 확인"),
    validate,
  ],
  (req, res) => {
    const { email, password } = req.body;
    const SQL = "INSERT INTO users (email,password) VALUES (?,?)";
    const VALUES = [email, password];
    conn.query(SQL, VALUES, function (err, results) {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(200);
    });
  }
);

router
  .route("/reset")
  // 비밀번호 초기화 요청
  .post(
    [body("email").notEmpty().isEmail().withMessage("이메일 확인"), validate],
    (req, res) => {
      const { email } = req.body;
      const SQL = "SELECT FROM users where email=?";
      const VALUES = [email];
      conn.query(SQL, VALUES, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(200);
      });
    }
  )
  // 비밀번호 초기화 요청
  .put(
    [
      body("email").notEmpty().isEmail().withMessage("이메일 확인"),
      body("password").notEmpty().isString().withMessage("비번 확인"),
      validate,
    ],
    (req, res) => {
      const { email, password } = req.body;
      const SQL = "UPDATE users SET password=? where email=?";
      const VALUES = [password, email];
      conn.query(SQL, VALUES, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(200);
      });
    }
  );

module.exports = router;
