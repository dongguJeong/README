const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param, query } = require("express-validator");
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controller/CartController");

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).end();
  }
};

router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:id", removeCartItem);

//장바구니에서 선택한 주문 예상 상품 목록 조회"
// router.get("/carts/" , (req,res) => {
//   res.json("장바구니에서 선택한 주문 예상 상품 목록 조회")
// })
module.exports = router;
