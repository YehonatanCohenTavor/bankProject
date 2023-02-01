var express = require('express');
var router = express.Router();
const validateLogin = require('../middlewares/loginValidation');
const database = require('../connection');
const validateForm = require('../middlewares/validateForm');
const jwt = require('jsonwebtoken');




router.post('/login', validateLogin, function (req, res, next) {
  const sql = `SELECT user.user_id,permission_id,token,expiration_date FROM user LEFT JOIN cookie ON user.user_id = cookie.user_id WHERE username='${req.body.username}'`;
  database.query(sql, (err, result) => {
    let token = jwt.sign({ user_id: result[0].user_id, permission: result[0].permission_id }, result[0].user_id.toString());
    if (result[0].token === null) {
      database.query(`INSERT INTO cookie (user_id,token) VALUES (${result[0].user_id},'${token}')`, (error, results) => {
        if (err) return res.status(503).json(err);
        return res.status(200).json({ token: token, expiration_date: new Date().toLocaleDateString(), user_id: result[0].user_id,permission: result[0].permission_id });
      })
      return;
    }
    if (err) return res.status(503).json(err);
    res.status(200).json({ existToken: result[0].token, user_id: result[0].user_id, expiration_date: result[0].expiration_date,permission: result[0].permission_id });
  })
});

router.post('/register', validateForm, (req, res, next) => {
  const { password, username, first_name, last_name, email, identity_number, address, birth_date, phone, branch } = req.body;
  database.beginTransaction(err => {
    if (err) return res.status(503).json(err);
    let sql = `INSERT INTO user (password,username,permission_id) VALUES('${password}','${username}',2)`;
    database.query(sql, (err, result) => {
      if (err && err.errno === 1062) return database.rollback(() => res.status(409).json('Username already exists'));
      if (err) return database.rollback(() => res.status(503).send(err))
      sql = `INSERT INTO customer (user_id,first_name, last_name, email, identity_number, address, birth_date, phone, branch)
                  VALUES(${result.insertId},'${first_name}','${last_name}','${email}',${identity_number},'${address}','${birth_date}','${phone}','${branch}')`;
      database.query(sql, (err1, result1) => {
        if (err1 && err1.errno === 1062) return database.rollback(() => res.status(409).json(err1.sqlMessage));
        if (err1) return database.rollback(() => res.status(503).send(err1));
        database.commit(err => {
          if (err) return database.rollback(() => res.status(503).send(err));
          res.status(200).json(result.insertId);
        })
      })
    })
  })
})


router.get('/:user_id/authorization', (req, res) => {
  const cookie = req.cookies.onlineUser;
  const user_id = req.params.user_id;
  const sql = `SELECT user_id FROM cookie WHERE token='${cookie}'`;
  database.query(sql, (err, result) => {
    jwt.verify(cookie, result[0].user_id.toString(), function (err, decoded) {
      if (+(decoded.user_id) != user_id) {
        return res.status(404).send(false);
      }
      else {
        return res.status(200).send(true)
      }
    });
  })
});

module.exports = router;
