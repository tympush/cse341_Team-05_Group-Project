const validator = require("../helpers/validator");

// UPDATE Country
const updateCountry = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        iso_code: "required|string",
        capital: "required|string",
        region: "required|string",
        subregion: "required|string",
        population: "required|integer",
        area_km2: "required|integer",
        currency: "required",
        "currency.code": "required|string",
        "currency.name": "required|string",
        "currency.symbol": "required|string",
        languages: "required|array",
        "languages.*": "string",
        timezones: "required|array",
        "timezones.*": "string",
        calling_code: "required",
        flag_url: "required"
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

// UPDATE Landmark
const updateLandmark = (req, res, next) => {
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
  updateCountry,
  updateLandmark
};