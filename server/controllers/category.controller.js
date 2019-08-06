const sql = require('../config/mysql');
const apiCtrl = require('./api.controller.js');


module.exports = {
  create,
  update,
  deleteCategory,
  get,
  list,
}

function create(req, res) {
  console.log(req.body);
  const name = req.body.name;
  const image= req.body.image;
  const query = `insert into dim_categories (name, image) 
  values ('${name}', '${image}')`;
  sql.query(query, (err, data) => {
      if(err) return apiCtrl.apiError(res, err);
      // console.log(data);
      apiCtrl.apiSuccess(res, "Category Updated successfully!");

  });
}

function update(req, res) {
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name;
  const image= req.body.image;
  const query = `update dim_categories set name = '${name}', image='${image}' where id = ${id})`;
  sql.query(query, (err, data) => {
      if(err) return apiCtrl.apiError(res, err);
      // console.log(data);
      apiCtrl.apiSuccess(res, "Category Created successfully!");

  });
}


function deleteCategory(req, res){
  let body = req.query;
  console.log(req.query);

  const query = `delete from dim_categories where id = ${body.id}`;
  sql.query(query, function (err, data) {
    if (err) return apiCtrl.apiError(res, err);
    apiCtrl.apiSuccess(res, "Successfully Deleted")
  });
}

function get(req, res) {
  let body = req.query;
  console.log(req.query);

  const query = `select * from dim_categories where id = ${body.id}`;
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

  const query = `select * from dim_categories limit ${limit} offset ${offset}`;
  sql.query(query, function (err, data) {
    if (err) return apiCtrl.apiError(res, err);

    apiCtrl.apiSuccess(res, { data: data, count: data.length })
  })
}