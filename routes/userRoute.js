const express = require('express');
const router = express.Router();
const { addUser, getUser } = require('../controller/userController.js')

router.post('/adduser', addUser)
router.get('/getuser', getUser)

module.exports = router;