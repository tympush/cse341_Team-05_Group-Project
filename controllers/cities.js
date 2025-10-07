const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Cities"]
    try {
        const result = await mongodb
            .getDb()
            .db("geography_db")
            .collection("cities")
            .find();
        const cities = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(cities);
    } catch (err) {
        console.error("Error fetching cities:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getOne = async (req, res) => {
    //#swagger.tags=["Cities"]
    try {
        const cityId = req.params.id;

        if (!ObjectId.isValid(cityId)) {
            return res.status(400).json({ error: "Invalid city ID format" });
        }

        const city = await mongodb
            .getDb()
            .db("geography_db")
            .collection("cities")
            .findOne({ _id: new ObjectId(cityId) });

        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }

        res.status(200).json(city);
    } catch (err) {
        console.error("Error fetching city:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createCity = async (req, res) => {
    //#swagger.tags=["Cities"]
    try {
        const city = {
            name: req.body.name,
            country: req.body.country,
            continent: req.body.continent,
            population: Number(req.body.population),
            area_km2: Number(req.body.area_km2),
            timezone: req.body.timezone,
            coordinates: {
                latitude: Number(req.body.coordinates?.latitude),
                longitude: Number(req.body.coordinates?.longitude),
            },
            description: req.body.description,
            image_url: req.body.image_url,
        };

        const collection = await mongodb
            .getDb()
            .db("geography_db")
            .collection("cities");

        const response = await collection.insertOne(city);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res
                .status(500)
                .json({ error: "Some error occurred while creating the city." });
        }
    } catch (err) {
        console.error("Error creating the city:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    getAll,
    getOne,
    createCity
};