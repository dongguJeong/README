const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param, query } = require("express-validator");
const { allCategory } = require("../controller/CategoryController");

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).end();
  }
};

// 전체 도서 조회
router.get("/", allCategory);

module.exports = router;
