var bcrypt = require('bcrypt-nodejs');

exports.cryptPassword = function(password) {
  // Load the bcrypt module
  // Generate a salt
  var salt = bcrypt.genSaltSync(10);
  // Hash the password with the salt
  var hash = bcrypt.hashSync(password, salt);

  return hash;
};

exports.comparePassword = function(password, userPassword) {
  //
  return bcrypt.compareSync(userPassword, password);
};