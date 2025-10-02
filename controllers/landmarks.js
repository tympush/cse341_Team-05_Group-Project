const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const updateLandmark = async (req, res) => {
    //#swagger.tags=["Landmarks"]
    try {
    const landmarkId = new ObjectId(req.params.id);
    const landmarkOne = {
      name: req.body.name,
      city: req.body.city,
      country: req.body.country,
      continent: req.body.continent,
      type: req.body.type,
      year_built: req.body.year_built,
      height_m: req.body.height_m,
      visitors_per_year: req.body.visitors_per_year,
      coordinates: req.body.coordinates,
      description: req.body.description,
      image_url: req.body.image_url
    };

    const response = await mongodb.getDb().db()
      .collection("landmarks")
      .updateOne({ _id: landmarkId }, { $set: landmarkOne });

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Landmark not found" });
    }

    if (response.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes made" });
    }

    res.status(200).json({ message: "Landmark updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};

const deleteLandmark = async (req, res) => {
    //#swagger.tags=["Landmarks"]
    try {
    const landmarkId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db()
      .collection("landmarks")
      .deleteOne({ _id: landmarkId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Landmark not found" });
    }

    res.status(200).json({ message: "Landmark deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred", error: error.message });
  }
};

module.exports = {
    updateLandmark,
    deleteLandmark
}