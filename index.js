const database = require('./database');
const express = require("express");
const app = express();
const path = require("path");
const port = 2812;
const mysql = require('mysql');
//"http://localhost:2812/product/"

app.use(express.json({
  extended: false
}));

// console.log(database);
// database.test();

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/get-products', function(req, res) {
  //console.log("tout va bien jusque ici");
  database.getProduct(null, (products) => { // le null c'est le parametre id de mon getUser donc si je veux affiner la recherche je peux mettre le numéro de l'id que je veux cibler directement.
    res.send(products);
  });
  // res.send({
  //   data: [],
  //   toutResteAFaire: true
  // });
});

app.listen(port, function() {
  console.log('Example app listening on port' + port);
});

/*requete POST*/

app.post('/product', (req, res) => {
  console.log(req.body);
  database.createProduct((err, dataset) => {
    res.send(dataset);
  }, req.body);
});

app.delete('/product', (req, res) => {
  // return console.log(req.body);
  // console.log("done");
  database.deleteProduct((err, dataset) => {
    res.send(dataset);
  }, req.body.ids);
});

// app.delete('/product', (req, res) => {
//   database.deleteProduct((err, dataset) => {
//     if (err) return res.status(500).send(err);
//     return res.status(200).send(dataset);
//   }, req.body.ids); // tableau d'ids ici ...
// });

app.patch('/product', (req, res) => {
  database.updateProduct((err, dataset) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).send(dataset);
  }, req.body); // un tableau d'ids ici ...
});
