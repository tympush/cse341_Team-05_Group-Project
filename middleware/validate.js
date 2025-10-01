const validator = require('../helpers/validator');

const validateCountry = (req, res, next) => {
    const validationRules = {
        name: 'required|string',
        iso_code: 'required|string|size:2',
        capital: 'required|string',
        region: 'required|string',
        subregion: 'required|string',
        population: 'required|integer|min:0',
        area_km2: 'required|numeric|min:0',
        currency:{
            name: 'required|string',
            code: 'required|string|size:3',
            symbol: 'required|string'
        },
        languages: 'required|array|min:1',
        calling_code: 'required|string',
        flag_url: 'required|url'
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).json({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const validateLandmark = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        city: "required|string",
        country: "required|string",
        continent: "required|string",
        type: "required|string",
        year_built: "required|integer",
        height_m: "required|integer",
        visitors_per_year: "required|integer",
        coordinates: "required",
        "coordinates.latitude": "required|numeric",
        "coordinates.longitude": "required|numeric",
        description: "required|string",
        image_url: "required"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: "Validation failed",
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
    validateCountry,
    validateLandmark
};