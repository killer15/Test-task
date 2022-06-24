const express = require('express');
const models = require('../controllers');
const router = express.Router();

router.get('/', models.listDrawings);
router.get('/detail', models.getModels);

module.exports = router;