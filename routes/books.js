const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param, query } = require("express-validator");
const { allBooks, bookDetail } = require("../controller/BookController");

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).end();
  }
};

// 전체 도서 조회
router.get("/", allBooks);

// 개별 도서 조회
router.get(
  "/:id",
  [param("id").isInt().withMessage("숫자"), validate],
  bookDetail
);

module.exports = router;
