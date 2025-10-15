const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

const citiesController = require("../controllers/cities");


router.get("/", citiesController.getAll);

router.get("/:id", citiesController.getOne);
router.get("/name/:name", citiesController.getCity);

router.post("/", isAuthenticated, validation.validateCity, citiesController.createCity);

router.put("/:id", isAuthenticated, validation.validateCity, citiesController.updateCity);

router.delete("/:id", isAuthenticated, citiesController.deleteCity);

module.exports = router;