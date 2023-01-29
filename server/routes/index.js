var express = require('express');
var router = express.Router();
const validateLogin = require('../middlewares/loginValidation');
const database = require('../connection');

/* GET home page. */
router.post('/login', validateLogin, function (req, res, next) {
  const sql = `SELECT user_id FROM user WHERE username='${req.body.username}'`;
  database.query(sql, (err, result) => {
    if (err) return res.status(503).send(err);
    res.status(200).json(result[0].user_id);
  })
});

router.post('/register', (req, res, next) => {
  // const { first_name, last_name, email, identity_number, address, birth_date, phone, branch } = req.body;
  // if (!first_name || !last_name || !email || !identity_number || !address || !birth_date || !phone || !branch) {
  //   return res.status(400).send('Missing required inputs!');
  // }
  
})

module.exports = router;
