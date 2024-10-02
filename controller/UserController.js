const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(64).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("base64");

  const SQL = "INSERT INTO users (email,password,salt) VALUES (?,?,?)";
  const VALUES = [email, hashPassword, salt];
  conn.query(SQL, VALUES, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.CREATED).send("회원가입");
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const SQL = "SELECT * FROM users where email = ?";
  const VALUES = [email];
  conn.query(SQL, VALUES, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const loginUser = results[0];
    const salt = loginUser.salt;
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("base64");

    if (loginUser && loginUser.password === hashPassword) {
      //토큰 발급
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: "30m",
          issuer: "JWT",
        }
      );

      //쿠키
      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(StatusCodes.OK).json({
        results,
      });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ msg: "실패" });
    }
  });
};

const requestPasswordReset = (req, res) => {
  const { email } = req.body;
  const SQL = "SELECT * FROM users where email = ?";
  const VALUES = [email];
  conn.query(SQL, VALUES, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).end();
    }

    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).end();
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

const passwordReset = (req, res) => {
  const { email, password } = req.body;

  const salt = crypto.randomBytes(64).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("base64");

  const SQL = "UPDATE users SET password=?, salt = ? WHERE email=?";
  const VALUES = [hashPassword, salt, email];
  conn.query(SQL, VALUES, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows === 0) {
      res.status(StatusCodes.BAD_REQUEST).end();
    } else {
      res.status(StatusCodes.OK).end();
    }
  });
};

module.exports = { join, login, requestPasswordReset, passwordReset };
