const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('cities')
            .find();
        const cities = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cities);
    } catch (err) {
        console.error('Error fetching cities:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    try {
        const cityId = req.params.id;

        if (!ObjectId.isValid(cityId)) {
            return res.status(400).json({ error: 'Invalid city ID format' });
        }

        const city = await mongodb
            .getDb()
            .db()
            .collection('cities')
            .findOne({ _id: new ObjectId(cityId) });

        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        res.status(200).json(city);
    } catch (err) {
        console.error('Error fetching city:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCity = async (req, res) => {
    try {
        const city = {
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
            .db()
            .collection('cities');

        const response = await collection.insertOne(city);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res
                .status(500)
                .json({ error: 'Some error occurred while creating the city.' });
        }
    } catch (err) {
        console.error('Error creating city:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { getAll, getOne, createCity };