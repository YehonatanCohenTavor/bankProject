var express = require('express');
var router = express.Router();
const database = require('../connection');
const validateUpdate = require('../middlewares/validateUpdate');

router.get('/', function (req, res, next) {
    let { start, limit } = req.query;
    database.query(`SELECT * FROM customer LIMIT ?,?`, [Number(start), Number(limit)], (err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result);
  })
});

router.get(`/aggregate/total`, (req, res) => {
    database.query(`SELECT COUNT(*) FROM customer`, (err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result[0]);
    });
})

router.get('/:customer_id', function (req, res, next) {
    database.query(`SELECT * FROM customer WHERE customer_id=${req.params.customer_id}`,(err, result) => {
        if (err) return res.status(503).json(err);
        res.status(200).json(result[0]);
  })
});


router.get('/:user_id/customerData', function (req, res, next) {
    database.query(`SELECT * FROM customer WHERE user_id=${req.params.user_id}`,(err, result) => {
        if (err) return res.status(503).json(err);
        return res.status(200).json(result[0]);
  })
});


router.put('/:user_id',validateUpdate, (req, res) => {
    let sql = '';
    for (let key in req.body) {
        sql+=`${key}='${req.body[key]}',`
    }
    sql = sql.slice(0, sql.length - 1);
    database.query(`UPDATE customer SET ${sql} WHERE user_id=${req.params.user_id}`, (err, result) => {
        if (err) res.status(503).json(err);
        database.query(`SELECT email,address,phone FROM customer WHERE user_id=${req.params.user_id}`, (err, result) => {
            if (err) res.status(503).json(err);
            return res.status(200).json(result[0]);
        })
    })
})



module.exports = router;