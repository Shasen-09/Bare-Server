const { startController } = require("../controller/startController");

const express = require("express");
const router = express.Router();

router.get('/', startController)

module.exports = router;