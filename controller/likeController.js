const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addLike = (req, res) => {
  const { id } = req.paprams;
  const { user_id } = req.body;
  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)";
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).end();
  });
};

const removeLike = (req, res) => {
  const { id } = req.paprams;
  const { user_id } = req.body;
  let sql = "DELETE FROM WHERE user_id = ? AND liked_book_id = ?";
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.OK).end();
  });
};

module.exports = { removeLike, addLike };
