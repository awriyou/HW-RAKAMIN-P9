/**
 * @swagger
 * component :
 *  schemas : 
 *      Movies: 
 *          type: object
 *          required:
 *              -title
 *              -genres
 *              -year
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Identitas dari data film
 *              title: 
 *                  type: string
 *                  description: Judul Film nya
 *              genres:
 *                  type: string
 *                  description: Genre atau kategori filmnya
 *              year: 
 *                  type: string
 *                  description : Tahun launch film
 *              
 */

let express = require("express");
const pool = require("./query.js");

const router = express.Router();

//Soal 1: Membuat method http request untuk mengolah data film
router.get("/", (req, res) => {
  pool.query("SELECT * FROM movies", (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows);
  });
});

router.get("/:id", (req, res) => {
  pool.query(
    `SELECT * FROM movies WHERE id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO movies (id, "title", "genres", "year") VALUES($1, $2, $3, $4)`,
    [req.body.id, req.body.title, req.body.genres, req.body.year],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

router.put("/:id", (req, res) => {
  pool.query(
    `UPDATE movies SET title = '${req.body.title}' WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

// Soal 2: Lakukan Pagination pada GET users dan GET movies dengan limit 10 user.

router.get("/", function (req, res) {
  pool.query(
    `SELECT * FROM movies ${req.query.limit ? "LIMIT " + req.query.limit : ""}`,
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result.rows);
    }
  );
});

module.exports = router;
