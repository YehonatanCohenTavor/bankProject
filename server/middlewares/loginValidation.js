const database = require('../connection');

function validateLogin(req, res, next) {
    const { username, password } = req.body;
    const sql = `SELECT username,password FROM user
     WHERE username='${username}' AND password='${password}'`;
    database.query(sql, (err, result) => {
        if (err) return res.status(503).send(err);
        if (result.length === 0) return res.status(404).send('User not found!');
        next();
        return;
    })
}

module.exports = validateLogin;