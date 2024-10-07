const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
// 전체 도서
const allBooks = (req, res) => {
  const { category_id, news, limit, currentPage } = req.query;

  let offset = limit * (currentPage - 1);

  let sql = "SELECT * FROM books";
  let values = [];

  if (category_id && news) {
    sql +=
      " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values.push(+category_id);
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    values.push(+category_id);
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }

  sql += " LIMIT ? OFFSET ?";
  values.push(+limit, offset);

  conn.query(sql, values, (err, results) => {
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
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  const { id } = req.params;
  const SQL =
    "SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id=?";
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
