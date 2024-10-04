const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const allCategory = (req, res) => {
  const SQL = "SELECT * FROM category";
  conn.query(SQL, (err, results) => {
    res.json(results);
  });
};

module.exports = { allCategory };
