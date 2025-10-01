const validator = require('../helpers/validator');

const saveCountry = (req, res, next) => {
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

module.exports = {
    saveCountry
};