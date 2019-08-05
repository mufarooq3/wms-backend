const bcrypt = require('bcrypt');
const Joi = require('joi');
const sql = require('../config/mysql');
const nodemailer = require('nodemailer');
const authCtrl = require('./auth.controller');
const apiCtrl = require('./api.controller.js');
var xml2js = require('xml2js');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testingsoftaksolutions@gmail.com',
    pass: 'softak1234'
  }
});

module.exports = {
  create,
  list,
  get,
  deleteUser,
  updatePassword,
  forgetPasswordEmail,
}

function create(req, res) {
  console.log(req.body);
  const username = req.body.userName;
  const password = bcrypt.hashSync(req.body.password, 10);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const contact = req.body.contact;
  const description = req.body.description;
  const role= req.body.role;
  const city = req.body.city;
  const country = req.body.country;
  const query = `insert into users (username, password, firstName, lastName, contact, description, role, city, country) 
  values ('${username}','${password}', '${firstName}', '${lastName}', '${contact}', '${description}', '${role}', '${city}', '${country}')`;
  sql.query(query, (err, data) => {
      if(err) return apiCtrl.apiError(res, err);
      // console.log(data);
      apiCtrl.apiSuccess(res, "User Created successfully!");

  });
  
}

function deleteUser(req, res){
  let body = req.query;
  console.log(req.query);

  const query = `delete from users where id = ${body.id}`;
  sql.query(query, function (err, data) {
    if (err) return apiCtrl.apiError(res, err);
    apiCtrl.apiSuccess(res, "Successfully Deleted")
  })
}

function get(req, res) {
  let body = req.query;
  console.log(req.query);

  const query = `select * from users where id = ${body.id}`;
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

  const query = `select * from users limit ${limit} offset ${offset}`;
  sql.query(query, function (err, data) {
    if (err) return apiCtrl.apiError(res, err);

    apiCtrl.apiSuccess(res, { data: data, count: data.length })
  })
}

function forgetPasswordEmail(req, res) {
  const query = `SELECT * FROM users WHERE userName='${req.body.userName}' or Email='${req.body.userName}' `;
  sql.query(query, function (err, data) {
    if (err) apiCtrl.apiError(res, err);
    console.log(data.recordset);
    if (data.recordset.length > 0) {
      let user = data.recordset[0];
      console.log(user);
      let token = authCtrl.generateToken(user);

      var mailOptions = {
        from: 'info@xyz.com',
        to: user.Email,
        subject: 'Reset your WMS password',
        html: `<h3>Hi ${user.FirstName}</h3>
<p>We received a request to reset your password for your UVS 7 account: ${user.UserName}</p><p>Please click on the link below to set a new password:</p><p><a href='http://uvs.codesorbit.com/reset-password/${user.UserName}/${token}' target="_blank">Reset your password</a></p><p>If you did not request to reset your password, you can safely ignore this email. Your password will not change.</p>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) apiCtrl.apiError(res, error);
        else apiCtrl.apiSuccess(res, user, 'Email Sent successfully!');
      });
    }
    else {
      apiCtrl.apiError(res, error, 'User Not found!');
    }

  });
}

function updatePassword(req, res) {
  const user = req.user,
    body = req.body,
    oldPassword = req.headers['oldpassword'],
    newPassword = req.headers['newpassword']
  bcrypt.compare(oldPassword, user.password, function (err, res) {
    console.log(res);
  });
  const query = `SELECT * FROM user WHERE ID='${user.ID}'`;
  sql.query(query, function (err, data) {
    if (err) console.log(err);
    let userData = data.recordset[0];
    if (!user || !bcrypt.compareSync(oldPassword, userData.Password)) {
      apiCtrl.apiError(res, '', 'Your current password could not be verified. Please try again.', 422);
      return;
      // return res.json({ error: 'Your login details could not be verified. Please try again.' });
    }
    insertPassword(user.ID, newPassword, res);
  });
}

