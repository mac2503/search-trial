const express = require('express');
const {addItem} = require('../controllers/search');

const router = express.Router();

router.post('/addItem', addItem);

module.exports = router;