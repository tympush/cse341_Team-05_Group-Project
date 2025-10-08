const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

const citiesController = require("../controllers/cities");


router.get("/", citiesController.getAll);

router.get("/:id", citiesController.getOne);

router.post("/", isAuthenticated, validation.validateCity, citiesController.createCity);

module.exports = router;