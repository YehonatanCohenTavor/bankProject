var express = require('express');
const database = require('../connection');
var router = express.Router();

/* GET users listing. */
router.get('/:user_id', function (req, res, next) {

    res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
    const { account_id, user_id, credit_number, cvv, expiration, company } = req.body;
    const sql = `INSERT INTO credit (account_id,user_id,credit_number,cvv,expiration,company) VALUES (${account_id},${user_id},'${credit_number}','${cvv}','${expiration}','${company}')`;
    database.query(sql, (err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result.insertId);
    });
});

module.exports = router;
