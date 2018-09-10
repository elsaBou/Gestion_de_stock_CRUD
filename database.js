var database = (function database() {
  'use strict';

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gestion_stock_crud',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  });
  connection.connect();


  const createProduct = (clbk, data) => {
    const insert = "INSERT INTO produit (nom, prix, description) VALUES (?, ?, ?)";
    const product = [data.nom, data.prix, data.description];

    connection.query(insert, product, (err, res, cols) => {
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const getProduct = (id, clbk) => {
    var q;
    if (id) {
      q = "SELECT * FROM produit WHERE id = ? ";
    } else {
      q = "SELECT * FROM produit";
    }
    connection.query(q, [id], function(error, results, fields) {
      if (error) {
        throw error
      } else {
        clbk(results);
      }
    });
  };

  const deleteProduct = (clbk, ids) => {
    const sql = "DELETE FROM produit WHERE id IN (?) ";

    connection.query(sql, [ids], function(err, res) {
      if (err) throw err;
      console.log('product deleted' + 'res.sql');
    });
  }

  // const deleteProduct = function deleteProduct(clbk, ids) {
  //   // la clause SQL IN permet de chercher une valeur dans un tableau
  //   const sql = "DELETE FROM produit WHERE id IN (?)";
  //
  //   connection.query(sql, [ids], function(err, res, fields) {
  //     // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
  //     if (err) return clbk(res, null);
  //     return clbk(null, res);
  //   });
  // };

  const updateProduct = function updateProduct(clbk, user) {
    const q = "UPDATE produit SET id_marque = ?, nom = ?, prix = ?, description = ?, WHERE id = ?";
    const payload = [produit.id, produit.id_marque, produit.nom, produit.prix, produit.description];
    connection.query(q, payload, function(err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const end = () => {
    connection.end();
  };

  module.exports = {
    end,
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct
  };
}());
