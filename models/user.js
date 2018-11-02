const bcrypt = require("bcryptjs");
const pool = require("../models/pool");

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, async function(err, hash) {
      const client = await pool.connect();
      const query = `insert into users(email, password) values ($1, $2)`;
      await client.query(query, [newUser.email, hash], (err, result) => {
        callback(err, result);
      });
    });
  });
};

module.exports.getUserByEmail = async function(email, callback) {
  const client = await pool.connect();
  const query = `select userid, email, password from users where email = $1`;
  await client.query(query, [email], (err, result) => {
    callback(err, result);
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
