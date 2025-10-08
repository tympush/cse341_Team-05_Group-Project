const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Continents"]
    try {
        const result = await mongodb
            .getDb()
            .db("geography_db")
            .collection("continents")
            .find();
        const continents = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(continents);
    } catch (err) {
        console.error("Error fetching continents:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getOne = async (req, res) => {
    //#swagger.tags=["Continents"]
    try {
        const continentId = req.params.id;

        if (!ObjectId.isValid(continentId)) {
            return res.status(400).json({ error: "Invalid continent ID format" });
        }

        const continent = await mongodb
            .getDb()
            .db("geography_db")
            .collection("continents")
            .findOne({ _id: new ObjectId(continentId) });

        if (!continent) {
            return res.status(404).json({ error: "Continent not found" });
        }

        res.status(200).json(continent);
    } catch (err) {
        console.error("Error fetching continent:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createContinent = async (req, res) => {
    //#swagger.tags=["Continents"]
    try {
        const continent = {
            name: req.body.name,
            area_km2: Number(req.body.area_km2),
            population: Number(req.body.population),
            number_of_countries: Number(req.body.number_of_countries),
            largest_country: req.body.largest_country,
            largest_city: req.body.largest_city,
            languages_major: req.body.languages_major,
            timezone_range: req.body.timezone_range,
            description: req.body.description,
            image_url: req.body.image_url
        };

        const collection = await mongodb
            .getDb()
            .db("geography_db")
            .collection("continents");

        const response = await collection.insertOne(continent);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res
                .status(500)
                .json({ error: "Some error occurred while creating the continent." });
        }
    } catch (err) {
        console.error("Error creating the continent:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateContinent = async (req, res) => {
    //#swagger.tags=["Continents"]
  try {
    console.log("Received ID:", req.params.id);
    const continentId = new ObjectId(req.params.id);
    const continentOne = {
        name: req.body.name,
        area_km2: Number(req.body.area_km2),
        population: Number(req.body.population),
        number_of_countries: Number(req.body.number_of_countries),
        largest_country: req.body.largest_country,
        largest_city: req.body.largest_city,
        languages_major: req.body.languages_major,
        timezone_range: req.body.timezone_range,
        description: req.body.description,
        image_url: req.body.image_url
    };
    const response = await mongodb.getDb().db("geography_db")
      .collection("continents")
      .updateOne({ _id: continentId }, { $set: continentOne });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Continent not found" });
    }

    if (response.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made" });
    }

    res.status(200).json({ message: "Continent updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};

const deleteContinent = async (req, res) => {
    //#swagger.tags=["Continents"]
    try {
    const continentId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db("geography_db").collection("continents").deleteOne({ _id: continentId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Continent not found" });
    }

    res.status(200).json({ message: "Continent deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};

module.exports = {
    getAll,
    getOne,
    createContinent,
    updateContinent,
    deleteContinent
};