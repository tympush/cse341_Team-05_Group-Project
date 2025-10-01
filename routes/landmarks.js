const express = require('express');
const router = express.Router();

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

const landmarksController = require('../controllers/landmarks');


router.put("/:id", isAuthenticated, validation.validateLandmark, landmarksController.updateLandmark);

router.delete("/:id", isAuthenticated, landmarksController.deleteLandmark);


module.exports = router;