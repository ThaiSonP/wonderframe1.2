var express = require('express');
var router = express.Router();
const db = require('../data/boards')

//route for all the boards
router.get('/',db.getAllBoards)
//route to get all the boards by a single user
router.get('/user/:id',db.getUserBoards)
// route to create a board for a single user
router.post('/',db.postBoard)

module.exports = router;
