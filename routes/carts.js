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

//장바구니 담기
router
  .route("/")
  .post((req, res) => {
    res.json("장바구니 담기");
  })
  //장바구니 조회
  .get("/", (req, res) => {
    res.json("장바구니 조회");
  });

//장바구니 도서 삭제"
router.delete("/carts/:id", (req, res) => {
  res.json("장바구니 도서 삭제");
});

//장바구니에서 선택한 주문 예상 상품 목록 조회"
// router.get("/carts/" , (req,res) => {
//   res.json("장바구니에서 선택한 주문 예상 상품 목록 조회")
// })
module.exports = router;
