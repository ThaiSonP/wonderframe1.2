var express = require('express');
var router = express.Router();
const db = require('../data/pins')

router.get('/',db.getAllPins)
router.get('/pin/:id',db.getOnePin)
router.get('/pinuser/:id',db.getUserPins)
router.post('/',db.postPin)


module.exports = router;
