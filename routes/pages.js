const express = require('express');
const { showIndexPage } = require('../controllers/HomeController');
const router = express.Router();

router.get('/', showIndexPage);

module.exports = router;