const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
        //#swagger.tags=["Countries"]
    try {
        const result = await mongodb
            .getDb()
            .db("geography_db")
            .collection("countries")
            .find();
        const countries = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(countries);
    } catch (err) {
        console.error("Error fetching countries:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getOne = async (req, res) => {
        //#swagger.tags=["Countries"]
    try {
        const countryId = req.params.id;

        if (!ObjectId.isValid(countryId)) {
            return res.status(400).json({ error: "Invalid country ID format" });
        }

        const country = await mongodb
            .getDb()
            .db("geography_db")
            .collection("countries")
            .findOne({ _id: new ObjectId(countryId) });

        if (!country) {
            return res.status(404).json({ error: "country not found" });
        }

        res.status(200).json(country);
    } catch (err) {
        console.error("Error fetching country:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createCountry = async (req, res) => {
        //#swagger.tags=["Countries"]
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
            .db("geography_db")
            .collection("countries");

        const response = await collection.insertOne(country);

        if (response.acknowledged) {
            res.status(201).json({ insertedId: response.insertedId });
        } else {
            res
                .status(500)
                .json({ error: "Some error occurred while creating the country." });
        }
    } catch (err) {
        console.error("Error creating country:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateCountry = async (req, res) => {
    //#swagger.tags=["Countries"]
  try {
    console.log("Received ID:", req.params.id);
    const countryId = new ObjectId(req.params.id);
    const countryOne = {
        name: req.body.name,
        iso_code: req.body.iso_code,
        capital: req.body.capital,
        region: req.body.region,
        subregion: req.body.subregion,
        population: req.body.population,
        area_km2: req.body.area_km2,
        currency: req.body.currency,
        languages: req.body.languages,
        timezones: req.body.timezones,
        calling_code: req.body.calling_code,
        flag_url: req.body.flag_url
    };
    const response = await mongodb.getDb().db("geography_db")
      .collection("countries")
      .updateOne({ _id: countryId }, { $set: countryOne });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Country not found" });
    }

    if (response.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made" });
    }

    res.status(200).json({ message: "Country updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};

const deleteCountry = async (req, res) => {
    //#swagger.tags=["Countries"]
    try {
    const countryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db("geography_db").collection("countries").deleteOne({ _id: countryId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json({ message: "Country deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};


module.exports = {
    getAll, 
    getOne, 
    createCountry, 
    updateCountry, 
    deleteCountry
};