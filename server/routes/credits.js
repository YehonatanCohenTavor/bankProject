var express = require('express');
const database = require('../connection');
var router = express.Router();

router.get('/:user_id', function (req, res) {
    const user_id = req.params.user_id;
    const sql = `SELECT * FROM credit WHERE user_id = ${user_id}`;
    database.query(sql, (err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result);
    });
});

router.post('/', function (req, res) {
    const { account_id, user_id, credit_number, cvv, expiration, company } = req.body;
    const sql = `INSERT INTO credit (account_id,user_id,credit_number,cvv,expiration,company) VALUES (${account_id},${user_id},'${credit_number}','${cvv}','${expiration}','${company}')`;
    database.query(sql, (err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result.insertId);
    });
});

router.delete('/', function (req, res) {
    const credit_id = req.body.credit_id;
    const sql = `DELETE FROM credit WHERE credit_id = ${credit_id}`;
    database.query(sql, (err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result);
    });
})

module.exports = router;