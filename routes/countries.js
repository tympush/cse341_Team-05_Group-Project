const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate")

const countriesController = require("../controllers/countries");

router.put("/:id", isAuthenticated, validation.updateCountry, countriesController.updateCountry);

router.delete("/:id", isAuthenticated, countriesController.deleteCountry);

module.exports = router;