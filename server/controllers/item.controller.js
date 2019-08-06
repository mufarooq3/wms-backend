const sql = require('../config/mysql');
const apiCtrl = require('./api.controller.js');


module.exports = {
  create,
  update,
  deleteItem,
  get,
  list,
}

function create(req, res) {
  console.log(req.body);
  const category_id = req.body.category_id;
  const name = req.body.name;
  const price = req.body.price;
  const serving = req.body.serving;
  const image= req.body.image;
  const query = `insert into dim_items (category_id, name, price, serving, image) 
  values ('${category_id}','${name}', '${price}', '${serving}', '${image}')`;
  sql.query(query, (err, data) => {
      if(err) return apiCtrl.apiError(res, err);
      // console.log(data);
      apiCtrl.apiSuccess(res, "Item Created successfully!");
  });
}

function update(req, res) {
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const serving = req.body.serving;
  const image= req.body.image;
  const query = `update dim_items set name = '${name}', price = '${price}', serving = '${serving}', image='${image}' where id = ${id})`;
  sql.query(query, (err, data) => {
      if(err) return apiCtrl.apiError(res, err);
      // console.log(data);
      apiCtrl.apiSuccess(res, "Item Updated successfully!");

  });
}

function deleteItem(req, res){
  let body = req.query;
  console.log(req.query);

  const query = `delete from dim_items where id = ${body.id}`;
  sql.query(query, function (err, data) {
    if (err) return apiCtrl.apiError(res, err);
    apiCtrl.apiSuccess(res, "Successfully Deleted")
  });
}

function get(req, res) {
  let body = req.query;
  console.log(req.query);

  const query = `select * from dim_items where id = ${body.id}`;
  sql.query(query, function (err, data) {
    if (err) return apiCtrl.apiError(res, err);
    delete data[0].password;
    apiCtrl.apiSuccess(res, { data: data[0]})
  })

}

function list(req, res) {
  let body = req.query,
    limit = body.limit ? body.limit : 10,
    offset = body.offset ? (body.offset * limit) : 0;

  const query = `select * from dim_items limit ${limit} offset ${offset}`;
  sql.query(query, function (err, data) {
    if (err) return apiCtrl.apiError(res, err);

    apiCtrl.apiSuccess(res, { data: data, count: data.length })
  })
}