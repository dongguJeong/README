const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

// 전체 도서
const allBooks = (req, res) => {
  const { category_id } = req.query;
  if (category_id) {
    const SQL = "SELECT * FROM books WHERE category_id =?";
    const VALUES = category_id;
    conn.query(SQL, VALUES, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.length > 0) {
        res.status(StatusCodes.OK).json(results);
      } else {
        res.status(StatusCodes.NOT_FOUND).end();
      }
    });
  } else {
    const SQL = "SELECT * FROM books";
    conn.query(SQL, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      res.status(StatusCodes.OK).json(results);
    });
  }
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  const { id } = req.params;
  const SQL = "SELECT * FROM books WHERE id=?";
  const VALUES = id;
  conn.query(SQL, VALUES, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results[0]) {
      res.status(StatusCodes.OK).json(results);
    } else {
      res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

module.exports = { allBooks, bookDetail };
