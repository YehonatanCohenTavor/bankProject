var express = require('express');
var router = express.Router();
const database = require('../connection');
const validateUpdate = require('../middlewares/validateUpdate');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let { start, limit } = req.query;
    database.query(`SELECT * FROM customer LIMIT ?,?`, [Number(start), Number(limit)], (err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result);
  })
});

router.get('/:customer_id', function (req, res, next) {
    database.query(`SELECT * FROM customer WHERE customer_id=${req.params.customer_id}`,(err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result);
  })
});

router.put('/:customer_id',validateUpdate, (req, res) => {
    let sql = '';
    for (let key in req.body) {
        sql+=`${key}='${req.body[key]}',`
    }
    sql = sql.slice(0, sql.length - 1);
    database.query(`UPDATE customer SET ${sql} WHERE customer_id=${req.params.customer_id}`, (err, result) => {
        if (err) res.status(503).json(err);
        database.query(`SELECT email,address,phone FROM customer WHERE customer_id=${req.params.customer_id}`, (err, result) => {
            if (err) res.status(503).json(err);
            res.status(200).json(result[0]);
        })
    })
})



module.exports = router;