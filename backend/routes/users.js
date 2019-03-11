var express = require('express');
var router = express.Router();
const db = require ('../data/users');
const passport = require("../auth/local");
const { loginRequired } = require("../auth/helpers");

/* GET users listing. */

router.get('/', db.getAllUsers);
router.get('/:id', db.getSingleUser);
router.patch('/:id',db.patchUser)
router.delete('/:id',db.deleteUser)

router.post("/new", db.createUser);
router.post("/login", passport.authenticate("local", {}), db.loginUser);
router.post("/logout", loginRequired, db.logoutUser);
router.get("/status/login", db.isLoggedIn);


module.exports = router;
