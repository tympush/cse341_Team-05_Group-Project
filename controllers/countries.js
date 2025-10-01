const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .db('geography_db')
            .collection('countries')
            .find();
        const countries = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(countries);
    } catch (err) {
        console.error('Error fetching countries:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    try {
        const countryId = req.params.id;

        if (!ObjectId.isValid(countryId)) {
            return res.status(400).json({ error: 'Invalid country ID format' });
        }

        const country = await mongodb
            .getDb()
            .db('geography_db')
            .collection('countries')
            .findOne({ _id: new ObjectId(countryId) });

        if (!country) {
            return res.status(404).json({ error: 'country not found' });
        }

        res.status(200).json(country);
    } catch (err) {
        console.error('Error fetching country:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCountry = async (req, res) => {
    try {
        const country = {
            name: req.body.name,
            iso_code: req.body.iso_code,
            capital: req.body.capital,
            region: req.body.region,
            subregion: req.body.subregion,
            population: Number(req.body.population),
            area_km2: Number(req.body.area_km2),
            currency: {
                name: req.body.currency?.name,
                code: req.body.currency?.code,
                symbol: req.body.currency?.symbol,
            },
            languages: req.body.languages,
            timezones: req.body.timezones,
            calling_code: req.body.calling_code,
            flag_url: req.body.flag_url,
        };

        const collection = await mongodb
            .getDb()
            .db('geography_db')
            .collection('countries');

        const response = await collection.insertOne(country);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res
                .status(500)
                .json({ error: 'Some error occurred while creating the country.' });
        }
    } catch (err) {
        console.error('Error creating country:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { getAll, getOne, createCountry };