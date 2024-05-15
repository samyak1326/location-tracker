const parser = require("papaparse");
const User = require("../model/User.model");

exports.editLocation = async (req, res) => {
    try {
      // extract the user's ID
      const { _id } = req.user;
      // extract location details from the request body
      const { id: locationId, name: newLocationName } = req.body;
  
      // update user with new location details
      const updatedUser = await User.findOneAndUpdate(
        { _id, "locations._id": locationId },
        {
          $set: {
            "locations.$.name": newLocationName,
          },
        },
        { new: true },
      );
  
      // if the location is not found
      if (!updatedUser) {
        return res.status(404).json({
          message: "Location not found",
          data: null,
        });
      }
  
      res.status(200).json({
        message: "Location updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        data: null,
      });
    }
};

exports.getLocationCsvData = async (req, res) => {};

exports.deleteLocation = async (req, res) => {};

exports.editLocation = async (req, res) => {};

exports.getUser = async (req, res) => {};