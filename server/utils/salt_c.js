// There are plenty of ways to store salts for hashing password
// The project is a demo one, let's store salts in a plain js file

const TOKEN_SALT = "s0me@ver4#!#secure=+=sa1t"
const PASSWORD_SALT = "s0me@ver4#!#secure=+=sa1tp@77w0r9"

module.exports = {
  token: TOKEN_SALT,
  password: PASSWORD_SALT
}