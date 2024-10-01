const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param, query } = require("express-validator");

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).end();
  }
};

//주문하기
router.post("/", (req, res) => {
  res.json("주문하기");
});

//주문 목록 조회
router.get("/", (req, res) => {
  res.json("주문 목록 조회");
});

//주문 상세 상품 조회
router.get("/:id", (req, res) => {
  res.json("주문 상세 상품 조회");
});

module.exports = router;
