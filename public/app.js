var clientApp = (function clientApp() {
  'use strict';

  var upd;

  const doAjax = function doAjax(url, method, callback, data) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url); //method et url de la fonction doAjax
      xhr.setRequestHeader('Content-Type', 'application/json');
      data = data ? JSON.stringify(data) : null;
      if (method.toLowerCase() === "post") { // on verifie que la methode c'est bien post avant d'envoyer
        if (!data) throw new Error("bad call");
      }

      // on attend le retour de l'index.js
      xhr.onload = evt => callback(evt.target.response || evt.srcElement.response);

      xhr.send(data || null);
    } catch (err) {
      console.error(err);
    }
  };

  var displayHtml = function displayHtml(text) {
    var getId = document.getElementById('insideTbody');
    getId.innerHTML = "";
    //console.log('test');
    text.forEach(function(el) {
      var createTr = document.createElement('tr');
      var createTd = document.createElement('td');
      var createTd1 = document.createElement('td');
      var createTd2 = document.createElement('td');
      var createTd3 = document.createElement('td');
      var createTd4 = document.createElement('td');
      var createEdit = document.createElement('td');
      createTd.innerHTML += "<input type='checkbox' name='' value='' class='checkbox' data-id=" + el.id + ">" + el.id;
      createEdit.innerHTML += '<img src="noun_edit_1926062_FFFFFF.svg" class="edit_product" multiple width="20" height="20"></img>';
      //createTd.innerHTML += el.id;
      createTd1.innerHTML += el.id_marque;
      createTd2.innerHTML += el.nom;
      createTd3.innerHTML += el.prix;
      createTd4.innerHTML += el.description;
      var tBody = getId.appendChild(createTr);
      tBody.appendChild(createTd);
      tBody.appendChild(createTd1);
      tBody.appendChild(createTd2);
      tBody.appendChild(createTd3);
      tBody.appendChild(createTd4);
      tBody.appendChild(createEdit);
      console.log(el);
      console.log(createTr);
    });
  };

  var listProducts = function listProducts() {

    const url = "http://localhost:2812/get-products/"
    doAjax(url, "GET", res => {
      //xhr.filter(JSON.parse(res));
      //console.log(JSON.parse(res));
      // return console.log("shiiiz", res)
      displayHtml(JSON.parse(res));
      //deleteProduct(JSON.parse(res));
    });
  };

  var createProducts = function createProducts(e) {
    e.preventDefault(); // pour que le texte reste sur la page, ne se supprime pas une fois validé
    const url = "http://localhost:2812/product/";
    doAjax(url, 'POST', res => { // nouvel appel de la fonction doAjax avec de nouveaux paramètres
      console.log(JSON.parse(res)); // res => est un callback cf ligne 5
    }, { // a partir d'ici 4eme parametre de ma fonction doAjax (le data)
      //marque: document.getElementById("input_marque").value,
      nom: document.getElementById("input_nom").value,
      prix: document.getElementById("input_prix").value,
      description: document.getElementById("input_description").value,
    });
  };

  var selectProduct = function selectProduct(e) {
    //e.preventDefault();
    var check = document.getElementsByClassName('checkbox');
    var checkArray = Array.from(check);
    var idTr = [];
    // console.log(check);
    // console.log(checkArray);
    checkArray.forEach(function(e) {
      //console.log(e);
      if (e.checked === true) {
        console.log("checked");
        //console.log(e);
        idTr.push(e.getAttribute("data-id"));
        // console.log(idTr);
        // console.log(idTr);
        //
      }
    });
    deleteProduct(idTr);
    console.log(idTr);
  };

  /**
   * @param {number[]} ids_cible - an array of number containing the product to delete ids
   */
  var deleteProduct = function deleteProduct(ids_cible) {
    //e.preventDefault(); // pour que le texte reste sur la page, ne se supprime pas une fois validé
    const url = "http://localhost:2812/product/"
    doAjax(url, 'DELETE', res => { // nouvel appel de la fonction doAjax avec de nouveaux paramètres
      console.log(JSON.parse(res)); // res => est un callback
      selectProduct(JSON.parse(res));
      console.log('hello from delete');
    }, { // a partir d'ici 4eme parametre de ma fonction doAjax (le data)
      ids: ids_cible
    });
  };

  var selectUpdateProduct = function selectUpdateProduct() {
    //var upd = document.getElementsByClassName('edit_product');
    var addupd = Array.from(upd);
    addupd.forEach(function(e) {
      if (e.clicked === true) {
        var idupdate = e.parentNode.id;
        console.log(idupdate);
        updateProduct(idupdate);
      }
    });
  };

  var updateProduct = function updateProduct(e, id_cible) {
    const url = "http://localhost:2812/product/"
    doAjax(url, 'PATCH', res => {
      displayHtml(JSON.parse(res));
      console.log('the update product');
    }, {
      id: id_cible
    });
  };

  var start = function start() {
    listProducts();
    var btn = document.getElementById('btn_valider').onclick = createProducts;
    document.getElementById('btn_supprimer').onclick = selectProduct;
    upd = document.getElementsByClassName('edit_product').onclick = selectUpdateProduct;
  };
  window.addEventListener('DOMContentLoaded', start);
}());
