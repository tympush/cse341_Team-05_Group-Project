const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

const continentsController = require("../controllers/continents");


router.get("/", continentsController.getAll);

router.get("/:id", continentsController.getOne);

router.post("/", isAuthenticated, validation.validateContinent, continentsController.createContinent);

module.exports = router;