var express = require('express');
var router = express.Router();
const database = require('../connection');


router.get('/', function (req, res, next) {
  database.query(`SELECT * FROM transaction`, (err, result) => {
    if (err) res.status(503).json(err);
    res.status(200).json(result);
  })
});

router.get('/:account_id/limit', (req, res, next) => {
  const account = req.params.account_id;
  const limit = req.query.limit;
  let sql = `SELECT * FROM transaction WHERE sender_account_id = ${account} OR reciever_account_id= ${account} ORDER BY transaction_id DESC LIMIT ${limit ? limit : 5};`;
  database.query(sql, (err, result) => {
    if (err) res.status(503).json(err);
    res.status(200).json(result);
  })
})

router.get('/:account_id', function (req, res, next) {
  const account_id = req.params.account_id;
  database.query(`SELECT * FROM transaction WHERE sender_account_id = ${account_id} OR reciever_account_id= ${account_id}`, (err, result) => {
    if (err) res.status(503).json(err);
    res.status(200).json(result);
  })
})

router.post('/', function (req, res, next) {

  const { sender_account_id, reciever_account_id, credit_id, amount, description } = req.body;

  // database.beginTransaction(function (err) {
  //   if (err) {
  //     throw err;
  //   }
  // database.query(`UPDATE account SET balance = balance - ${amount} WHERE account_id = ${sender_account_id}`, function (error, results) {
  //   if (error) {
  //     return database.rollback(function () {
  //       throw error;
  //     });
  //   }
  //   database.query(`UPDATE account SET balance = balance + ${amount} WHERE account_id = ${reciever_account_id}`, function (error, results) {
  //     if (error) {
  //       return database.rollback(function () {
  //         throw error;
  //       });
  //     }
  database.query(`INSERT INTO transaction (sender_account_id, reciever_account_id, credit_id, amount, description) VALUES(${sender_account_id}, ${reciever_account_id}, ${credit_id}, ${amount}, '${description}')`, function (err, result) {
    if (err) return res.status(503).send(err);
    database.query(`SELECT * FROM transaction WHERE transaction_id = ${result.insertId}`, function (err, result) {
      if (err) return res.status(503).send(err);
      res.status(200).json(result);
    });
    // database.commit(function (err) {
    //   if (err) {
    //     return database.rollback(function () {
    //       throw err;
    //     });
    //   }
    //   console.log('Transaction complete.');
    // });
    //   });
    // });
    // });
  });
});

router.put('/', function (req, res, next) {
  const { transaction_id } = req.body;
  database.beginTransaction(function (err) {
    if (err) {
      throw err;
    }
    database.query(`SELECT transaction_id,sender.balance as 'sender_balance',reciever.balance as 'reciever_balance',amount,sender_account_id,reciever_account_id FROM transaction JOIN account sender ON sender.account_id = transaction.sender_account_id JOIN account reciever ON reciever.account_id = transaction.reciever_account_id WHERE transaction_id = ${transaction_id};`, function (error, result) {
      if (error) {
        return database.rollback(function () {
          throw error;
        });
      }
      database.query(`UPDATE account SET balance = ${result[0].sender_balance} - ${result[0].amount} WHERE account_id = ${result[0].sender_account_id}`, function (error, results) {
        if (error) {
          return database.rollback(function () {
            throw error;
          });
        }
        database.query(`UPDATE account SET balance = ${result[0].reciever_balance} + ${result[0].amount} WHERE account_id = ${result[0].reciever_account_id}`, function (error, results) {
          if (error) {
            return database.rollback(function () {
              throw error;
            });
          }
          database.query(`UPDATE transaction SET status = 'completed' WHERE transaction_id = ${transaction_id}`, function (error, results) {
            if (error) {
              return database.rollback(function () {
                throw error;
              });
            }
            database.commit(function (error) {
              if (error) {
                return database.rollback(function () {
                  throw error;
                });
              }
              res.status(200).json(result[0]);
            });
          });
        });
      });
    });
  });
});

module.exports = router;


// {
// 	"sender_account_id":2,
// 	"reciever_account_id":5,
// 	"credit_id":null,
// 	"amount":200,
// 	"description":"heeedddddeello"
// }