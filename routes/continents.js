const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

const continentsController = require("../controllers/continents");


router.get("/", continentsController.getAll);

router.get("/:id", continentsController.getOne);

router.get("/name/:name", continentsController.getContinent);

router.post("/", isAuthenticated, validation.validateContinent, continentsController.createContinent);

router.put("/:id", isAuthenticated, validation.validateContinent, continentsController.updateContinent);

router.delete("/:id", isAuthenticated, continentsController.deleteContinent);

module.exports = router;