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

router
  .route("/:id")
  // 좋아요
  .put(
    [param("id").isInt().withMessage("숫자"), validate],
    (req, res, next) => {
      const { id } = req.params;
      res.json("좋아요 추가");
      //   let SQL = "UPDATE books SET liked=liked+1 WHERE id=?";
      //   const VALUES = [id];

      //   conn.query(SQL, VALUES, function (err, results) {
      //     if (err) {
      //       console.log(err);
      //       return res.status(400).end();
      //     }
      //   });
    }
  )
  // 좋아요 취소
  .delete(
    [param("id").isInt().withMessage("숫자"), validate],
    (req, res, next) => {
      const { id } = req.params;
      res.json("좋아요 취소");
      //   let SQL = "UPDATE books SET liked=liked+1 WHERE id=?";
      //   const VALUES = [id];

      //   conn.query(SQL, VALUES, function (err, results) {
      //     if (err) {
      //       console.log(err);
      //       return res.status(400).end();
      //     }
      //   });
    }
  );

module.exports = router;
