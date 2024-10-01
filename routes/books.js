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

// 전체 도서 조회
router.get("/", (req, res) => {
  const SQL = "SELECT * FROM books";
  conn.query(SQL, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(400).end();
    }
    res.status(200).json(Array.from(results));
  });
});

// 카테고리별 도서 조회 및 신간 필터
router.get(
  "/",
  [
    query("categoryId").isString().withMessage("카테고리 확인"),
    query("new").optional().isBoolean().withMessage("new 확인"),
    validate,
  ],
  (req, res, next) => {
    const { categoryId, new: isNew } = req.query;
    let SQL = "SELECT * FROM books WHERE category=?";
    const VALUES = [categoryId];

    if (isNew === "true") {
      SQL += " AND DATEDIFF(NOW(), pubDate) <= 30";
    }

    conn.query(SQL, VALUES, function (err, results) {
      const arr = Array.from(results);
      if (err) {
        console.log(err);
        return res.status(400).end();
      }

      res.status(200).json(arr);
    });
  }
);

// 개별 도서 조회
router.get(
  "/:id",
  [param("id").isInt().withMessage("숫자"), validate],
  (req, res, next) => {
    const { id } = req.params;
    const SQL = "SELECT * FROM books WHERE bookId=?";
    const VALUES = [id];
    conn.query(SQL, VALUES, function (err, results) {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(200).json(results);
    });
  }
);

module.exports = router;
