const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, validationResult, param, query } = require("express-validator");
const { removeLike, addLike } = require("../controller/likeController");

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
  .put([param("id").isInt().withMessage("숫자"), validate], addLike)
  // 좋아요 취소
  .delete([param("id").isInt().withMessage("숫자"), validate], removeLike);

module.exports = router;
