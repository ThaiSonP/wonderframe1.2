// this index.js is a shortcut of requiring pg-prmise on our databse to all routes
// const pgp = require ('pg-promise')({});
// const db = pgp ('postgres://localhost/login');

var pgp = require("pg-promise")({});
var connectionString = process.env.DATABASE_URL || 'postgres://localhost/login';
var db = pgp(connectionString);

module.exports = db
