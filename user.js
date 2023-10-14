let express = require("express");
const pool = require("./query.js");

const router = express.Router();

//Soal 1: Membuat method http request untuk mengolah data user



// Soal 2: Lakukan Pagination pada GET users dan GET movies dengan limit 10 user.

router.get("/", function (req, res) {
  pool.query(
    `SELECT * FROM users ${req.query.limit ? "LIMIT " + req.query.limit : ""}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

module.exports = router;
