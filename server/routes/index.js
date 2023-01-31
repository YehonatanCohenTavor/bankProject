var express = require('express');
var router = express.Router();
const validateLogin = require('../middlewares/loginValidation');
const database = require('../connection');
const validateForm = require('../middlewares/validateForm');

/* GET home page. */
router.post('/login', validateLogin, function (req, res, next) {
  const sql = `SELECT user_id FROM user WHERE username='${req.body.username}'`;
  database.query(sql, (err, result) => {
    if (err) return res.status(503).json(err);
    res.status(200).json(result[0].user_id);
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
        if (err1 && err1.errno === 1062) return database.rollback(() => res.status(409).json(err1));
        if (err1) return database.rollback(() => res.status(503).send(err1));
        database.commit(err => {
          if (err) return database.rollback(() => res.status(503).send(err));
          res.status(200).json(result.insertId);
        })
      })
    })
  })
})

module.exports = router;
