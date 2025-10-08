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

const updateCity = async (req, res) => {
    //#swagger.tags=["Cities"]
  try {
    console.log("Received ID:", req.params.id);
    const cityId = new ObjectId(req.params.id);
    const cityOne = {
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
    const response = await mongodb.getDb().db("geography_db")
      .collection("cities")
      .updateOne({ _id: cityId }, { $set: cityOne });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    if (response.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made" });
    }

    res.status(200).json({ message: "City updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};

const deleteCity = async (req, res) => {
    //#swagger.tags=["Cities"]
    try {
    const cityId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db("geography_db").collection("cities").deleteOne({ _id: cityId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};

module.exports = {
    getAll,
    getOne,
    createCity,
    updateCity,
    deleteCity
};