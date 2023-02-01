var express = require('express');
var router = express.Router();
const database = require('../connection');
const jwt = require('jsonwebtoken');

router.get('/:token', function (req, res, next) {
  const token = req.params.token;
  database.query(`SELECT user_id FROM cookie WHERE token='${req.params.token}'`, (err, result) => {
    if (err) res.status(503).json(err);
    jwt.verify(token, result[0].user_id.toString(), function (err, decoded) {
      res.status(200).json(decoded);
    });
  })
});


module.exports = router;
