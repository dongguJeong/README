const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const {
  join,
  login,
  requestPasswordReset,
  passwordReset,
} = require("../controller/UserController");

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
  login
);

// 회원가입
router.post(
  "/join",
  [
    body("password").notEmpty().isString().withMessage("비번 확인"),
    body("email").notEmpty().isEmail().withMessage("이메일 확인"),
    validate,
  ],
  join
);

router
  // 비밀번호 초기화 요청
  .post(
    "/reset",
    [body("email").notEmpty().isEmail().withMessage("이메일 확인"), validate],
    requestPasswordReset
  );

router
  // 비밀번호 초기화
  .put(
    "/reset",
    [
      body("email").notEmpty().isEmail().withMessage("이메일 확인"),
      body("password").notEmpty().isString().withMessage("비번 확인"),
      validate,
    ],
    passwordReset
  );

module.exports = router;
