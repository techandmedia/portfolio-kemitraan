const express = require("express");
const router = express.Router();
const mySQL = require("../config/config-MySQL");

exports.getAllemployee = router.get("/api/employee", (req, res) => {
  mySQL.query("SELECT * from employee", (err, results) => {
    if (err) console.log(err);
    res.send(JSON.stringify(results));
  });
});

exports.getSortedEmployee = router.get("/api/employee/ordered", (req, res) => {
  mySQL.query(
    "SELECT * FROM `employee` ORDER BY `fullname`",
    (err, results) => {
      if (err) console.log(err);
      res.send(JSON.stringify(results));
    }
  );
});

exports.getEmployeeByID = router.get("/api/employee/:id", (req, res) => {
  mySQL.query(
    "SELECT * from employee where id=?",
    [req.params.id],
    (err, results, fields) => {
      if (err) console.log(err);
      res.end(JSON.stringify(results));
    }
  );
});

exports.postEmployee = router.post("/api/employee/new", (req, res) => {
  var postData = req.body;
  mySQL.query(
    "INSERT INTO employee SET ?",
    postData,
    (err, results, fields) => {
      if (err) console.log(err);
      // console.log(results.insertId);
      res.end(JSON.stringify(results));
    }
  );
});

module.exports = router;
