const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

const countriesController = require("../controllers/countries");


router.get("/", countriesController.getAll);

router.get("/name/:name", countriesController.getContry);

router.get("/:id", countriesController.getOne);

router.post("/", isAuthenticated, validation.validateCountry, countriesController.createCountry);

router.put("/:id", isAuthenticated, validation.validateCountry, countriesController.updateCountry);

router.delete("/:id", isAuthenticated, countriesController.deleteCountry);


module.exports = router;