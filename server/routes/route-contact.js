const express = require("express");
const router = express.Router();
const mySQL = require("../config/config-MySQL");

exports.getAllContacts = router.get("/api/contacts", (req, res) => {
  mySQL.query("SELECT * from contacts", (err, results) => {
    if (err) console.log(err);
    res.send(JSON.stringify(results));
  });
});

exports.getSortedContact = router.get("/api/contacts/ordered", (req, res) => {
  mySQL.query(
    "SELECT * FROM `contacts` ORDER BY `fullname`",
    (err, results) => {
      if (err) console.log(err);
      res.send(JSON.stringify(results));
    }
  );
});

exports.getContactByID = router.get("/api/contacts/:id", (req, res) => {
  mySQL.query(
    "SELECT * from contacts where id=?",
    [req.params.id],
    (err, results, fields) => {
      if (err) console.log(err);
      res.end(JSON.stringify(results));
    }
  );
});

exports.putContact = router.put("/api/contacts/update/:id", (req, res) => {
  const putData = req.body;
  const idToPutData = req.params.id;
  mySQL.query("UPDATE `contacts` SET `userid=?`, `fullname`=?, `usergroup=?`, `emailid`=?, `mobile`=?, `title`=?, `pp=?`, WHERE id=?", 
  [putData.userid, putData.fullname, putData.usergroup, putData.emailid, putData.mobile, putData.title, putData.pp, idToPutData],
    (err, results, fields) => {
      if (err) console.log(err);
      // console.log(results.insertId);
      res.end(JSON.stringify(results));
    }
  );
});

exports.postContact = router.post("/api/contacts/new", (req, res) => {
  var postData = req.body;
  mySQL.query("INSERT INTO contacts SET ?", postData,
    (err, results, fields) => {
      if (err)
      res.status(400).json({
        value: '0',
        status: 'gagal',
        message: 'Ada error'
      })
      // console.log(err);
      // console.log(results.insertId);
      // res.end(JSON.stringify(results));
      res.status(201).json({
        value: '1',
        status: 'success',
        message: 'Kontak berhasill ditambah'
      })
    }
  );
});

module.exports = router;
