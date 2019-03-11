// this index.js is a shortcut of requiring pg-prmise on our databse to all routes
const pgp = require ('pg-promise')({});
const db = pgp ('postgres://localhost/login');

module.exports = db
