const express = require('express');
const router = express.Router();

const landmarksController = require('../controllers/landmarks');

const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', landmarksController.getAll);

router.get('/:id', landmarksController.getOne);

router.post('/', isAuthenticated, validation.saveLandmark, landmarksController.createLandmark);

module.exports = router;