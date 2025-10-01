const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const validate = require('../middleware/validate').validate;
const { isAuthenticated } = require('../middleware/authenticate');

const citiesController = require('../controllers/cities');

router.get('/', citiesController.getAll);

router.get(
    '/:id',
    [param('id').isMongoId().withMessage('Invalid city ID format.')],
    validate,
    citiesController.getOne
);

router.post(
    '/',
    isAuthenticated,
    [
        body('name').notEmpty().withMessage('City name is required'),
        body('iso_code').notEmpty().withMessage('ISO code is required'),
        body('capital').notEmpty().withMessage('Capital is required'),
        body('region').notEmpty().withMessage('Region is required'),
        body('subregion').optional(),
        body('population').isInt({ min: 0 }).withMessage('Population must be a positive number'),
        body('area_km2').isInt({ min: 0 }).withMessage('Area must be a positive number'),
        body('currency').optional().isObject().withMessage('Currency must be an object'),
        body('languages').optional().isArray().withMessage('Languages must be an array'),
        body('timezones').optional().isArray().withMessage('Timezones must be an array'),
        body('calling_code').optional().isString(),
        body('flag_url').optional().isString(),
    ],
    validate,
    citiesController.createCity
);

module.exports = router;