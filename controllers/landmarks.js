const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .db('geography_db')
            .collection('landmarks')
            .find();
        const landmarks = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(landmarks);
    } catch (err) {
        console.error('Error fetching landmarks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    try {
        const landmarkId = req.params.id;

        if (!ObjectId.isValid(landmarkId)) {
            return res.status(400).json({ error: 'Invalid landmark ID format' });
        }

        const landmark = await mongodb
            .getDb()
            .db('geography_db')
            .collection('landmarks')
            .findOne({ _id: new ObjectId(landmarkId) });

        if (!landmark) {
            return res.status(404).json({ error: 'Landmark not found' });
        }

        res.status(200).json(landmark);
    } catch (err) {
        console.error('Error fetching landmark:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createLandmark = async (req, res) => {
    try {
        const landmark = {
            name: req.body.name,
            city: req.body.city,
            country: req.body.country,
            continent: req.body.continent,
            type: req.body.type,
            year_built: Number(req.body.year_built),
            height_m: Number(req.body.height_m),
            visitorsperyear: Number(req.body.visitorsperyear),
            coordinates: req.body.coordinates ? {
                latitude: Number(req.body.coordinates.latitude),
                longitude: Number(req.body.coordinates.longitude),
            }: null,
            description: req.body.description,
            image_url: req.body.image_url,
        };

        const collection = await mongodb
            .getDb()
            .db('geography_db')
            .collection('landmarks');

        const response = await collection.insertOne(landmark);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res
                .status(500)
                .json({ error: 'Some error occurred while creating the landmark.' });
        }
    } catch (err) {
        console.error('Error creating landmark:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { getAll, getOne, createLandmark };