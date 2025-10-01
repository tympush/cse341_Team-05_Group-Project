const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const updateCountry = async (req, res) => {
    //#swagger.tags=['Countries']
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
    const response = await mongodb.getDb().db()
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
    //#swagger.tags=['Countries']
    try {
    const countryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection("countries").deleteOne({ _id: countryId });

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
    updateCountry,
    deleteCountry
}