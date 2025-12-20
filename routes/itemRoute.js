const express = require('express')
const router = express.Router();
const { getItem, addItem } = require('../controller/itemController');
const asyncHandler = require('../utils/asyncHandler')

router.get('/getitems', asyncHandler(getItem))
router.post('/additems', asyncHandler(addItem))

module.exports = router;