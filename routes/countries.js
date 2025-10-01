const express = require('express');
const router = express.Router();

const countriesController = require('../controllers/countries');

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', countriesController.getAll);

router.get('/:id', countriesController.getOne);

router.post('/', isAuthenticated, validation.saveCountry, countriesController.createCountry);

module.exports = router;