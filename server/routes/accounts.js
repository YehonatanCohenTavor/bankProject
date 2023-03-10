var express = require('express')
var router = express.Router()
const database = require('../connection')

router.get('/', function (req, res) {
  const sql = 'SELECT * FROM account'
  database.query(sql, (err, result) => {
    if (err) res.status(503).json(err)
    res.status(200).json(result)
  })
})

router.get('/:user_id', function (req, res) {
  const user_id = req.params.user_id
  const sql = `SELECT * FROM account WHERE user_id = ${user_id}`
  database.query(sql, (err, result) => {
    if (err) res.status(503).json(err)
    res.status(200).json(result)
  })
})

router.get('/:user_id/accounts', (req, res) => {
  const { user_id } = req.params
  const sql = `SELECT * FROM account WHERE user_id=${user_id}`
  database.query(sql, (err, result) => {
    if (err) res.status(503).json(err)
    res.status(200).json(result)
  })
})

router.get(`/aggregate/total`, (req, res) => {
  database.query(`SELECT COUNT(*) FROM account`, (err, result) => {
    if (err) return res.status(503).json(err)
    res.status(200).json(result[0])
  })
})

router.get(`/:user_id/totalBalance`, (req, res) => {
  const user_id = req.params.user_id
  database.query(
    `SELECT SUM(balance) as total FROM account JOIN user USING(user_id) WHERE user_id=${user_id}`,
    (err, result) => {
      if (err) return res.status(503).json(err)
      res.status(200).json(result[0])
    }
  )
})


router.post('/', (req, res) => {
    const { user_id, type, name } = req.body;
    const sql = `INSERT INTO account (user_id,balance,type,name) VALUES (${user_id},0,'${type}','${name}');`;
  database.query(sql, (err, result) => {
    if (err) return res.status(503).json(err);
        res.status(200).json('Account created successfully. Current balance is 0');
    })
});

router.delete('/', (req, res) => {
  const account_id = req.body.account_id
  const sql = `UPDATE account SET deleted = 1 WHERE account_id = ${account_id};`
  database.query(sql, (err, result) => {
    if (err) return res.status(503).json(err)
    res.status(200).json(result)
  })
})

module.exports = router

// {
// 	"user_id":3,
// 	"type":"current",
// 	"name":"my current mosh"
// }
