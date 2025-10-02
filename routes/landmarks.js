const express = require("express");
const router = express.Router();

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

const landmarksController = require("../controllers/landmarks");

router.get('/', landmarksController.getAll);

router.get('/:id', landmarksController.getOne);

router.post('/', isAuthenticated, validation.validateLandmark, landmarksController.createLandmark);

router.put("/:id", isAuthenticated, validation.validateLandmark, landmarksController.updateLandmark);

router.delete("/:id", isAuthenticated, landmarksController.deleteLandmark);


module.exports = router;