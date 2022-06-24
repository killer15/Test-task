const express = require('express');
const models = require('../controllers');
const router = express.Router();

router.get('/', models.listServices);

module.exports = router;