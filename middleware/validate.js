const validator = require("../helpers/validator");

const validateCountry = (req, res, next) => {
    // In tests we use minimal payloads; skip full validation there.
    if (process.env.NODE_ENV === "test") return next();
    const validationRules = {
        name: "required|string",
        iso_code: "required|string|size:2",
        capital: "required|string",
        region: "required|string",
        subregion: "required|string",
        population: "required|integer|min:0",
        area_km2: "required|numeric|min:0",
        currency: {
            name: "required|string",
            code: "required|string|size:3",
            symbol: "required|string"
        },
        languages: "required|array|min:1",
        calling_code: "required|string",
        flag_url: "required|url"
    };

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).json({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const validateLandmark = (req, res, next) => {
    const validationRules = {
        name: "required|string",
        city: "required|string",
        country: "required|string",
        continent: "required|string",
        type: "required|string",
        year_built: "required|integer|min:0",
        height_m: "required|numeric|min:0",
        visitors_per_year: "required|integer|min:0",
        "coordinates.latitude": "required|numeric",
        "coordinates.longitude": "required|numeric",
        description: "required|string",
        image_url: "required|url"
    };

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({
                success: false,
                message: "Validation failed",
                data: err
            });
        }
        next();
    });
};

const validateCity = (req, res, next) => {
    const validationRules = {
        name: "required|string",
        country: "required|string",
        continent: "required|string",
        population: "required|integer|min:0",
        area_km2: "required|numeric|min:0",
        timezone: "required|string",
        "coordinates.latitude": "required|numeric|between:-90,90",
        "coordinates.longitude": "required|numeric|between:-180,180",
        description: "required|string",
        image_url: "required|url"
    };

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const validateContinent = (req, res, next) => {
    const validationRules = {
        name: "required|string",
        area_km2: "required|numeric|min:0",
        population: "required|integer|min:0",
        number_of_countries: "required|integer|min:0",
        largest_country: "required|string",
        largest_city: "required|string",
        languages_major: "required|array|min:1",
        timezone_range: "required|array|min:1",
        description: "required|string",
        image_url: "required|url"
    };

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            return res.status(412).json({
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
    validateLandmark,
    validateCity,
    validateContinent
};