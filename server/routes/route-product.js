const express = require("express");
const router = express.Router();
const mySQL = require("../config/config-MySQL");

// API for table: product_history

exports.getProductHistory = router.get("/api/product_history", (req, res) => {
  mySQL.query("SELECT * from product_history", (err, results) => {
    if (err) console.log(err);
    res.send(JSON.stringify(results));
  });
});

exports.getProductHistory = router.get("/api/product_history/ordered", (req, res) => {
  mySQL.query("SELECT * FROM `product_history` ORDER BY `fullname`", (err, results) => {
    if (err) console.log(err);
    res.send(JSON.stringify(results));
  });
});

// API for table: product

exports.getProductByDate = router.get("/api/product/orderedbydate", (req, res) => {
  mySQL.query("SELECT * FROM `product` ORDER BY `product`.`time` DESC", (err, results) => {
    if (err) console.log(err);
    res.send(JSON.stringify(results));
  });
});

exports.getAllProduct = router.get("/api/product", (req, res) => {
  mySQL.query("SELECT * from product", (err, results) => {
    if (err) console.log(err);
    res.send(JSON.stringify(results));
  });
});

exports.getProductByName = router.get("/api/product/orderedbyname", (req, res) => {
  mySQL.query(
    "SELECT * FROM `product` ORDER BY `productname`",
    (err, results) => {
      if (err) console.log(err);
      res.send(JSON.stringify(results));
    }
  );
});

exports.getProductByID = router.get("/api/product/:id", (req, res) => {
  mySQL.query(
    "SELECT * from `product` WHERE id=?", [req.params.id],
    (err, results, fields) => {
      if (err) console.log(err);
      res.end(JSON.stringify(results));
    }
  );
});

exports.putProduct = router.put("/api/product/update/:id", (req, res) => {
  // console.log('req', req)
  // console.log('res', res)
  console.log('reqbody', req.body)
  console.log('reqbodycate', req.body.category)
  // console.log('reqcate', req.category)
  const putData = req.body;
  // const putData2 = req.params.category;
  console.log('putData', putData.category)
  // console.log('putData2', putData2)
  const idToPutData = req.params.id;
  console.log('idData', idToPutData)
  mySQL.query(
    // "UPDATE `product` SET ? WHERE id=?",
    "UPDATE `product` SET `category`=?, `productname`=?, `os`=?, `model`=?, `serialnumber`=?, `price`=?, `equipment_condition`=?, `detail`=?, `image`=? WHERE id=?",
    [putData.category, putData.productname, putData.os, putData.model, putData.serialnumber, putData.price, putData.equipment_condition, putData.detail, putData.image, idToPutData],
    (err, results, fields) => {
      if (err) console.log(err);
      console.log(results.insertId);
      res.end(JSON.stringify(results));
    }
  );
});

exports.postProduct = router.post("/api/product/new", (req, res, next) => {
  const postData = req.body; // jadi data yang dari front sudah masuk ditampung di sini
  // console.log('post1', postData)
  mySQL.query(
    // di sini cuma masukin ke query aja, selama ini salah mikir, kirain datanya
    "INSERT INTO `product` SET ?", postData,
    (err, results, fields) => {
      // console.log('post2', postData)
      // console.log('results1', results)
      if (err) console.log(err);
      // console.log('post3', postData)
      // console.log('resultsRows', results.affectedRows)
      // const abcs = res.end(JSON.stringify(results))
      // console.log('resEndabcs', abcs); // true  karena koneksi belum end
      res.end(JSON.stringify(results)); // koneksi end
      // console.log('post4', postData)
      // console.log('resEndabcs', abcs); // false > karena koneksi sudah end
    }
  );
});

exports.deleteProduct = router.delete("/api/product/delete/:id", (req, res) => {
  const conDeleteData = { id: req.params.id }
  const idToDelete = req.params.id
  mySQL.query(
    "DELETE FROM `product` WHERE id=?", [idToDelete, conDeleteData],
    (err, results, fields) => {
      if (err) console.log(err);
      res.end(JSON.stringify(results));
    }
  );
});

module.exports = router;
