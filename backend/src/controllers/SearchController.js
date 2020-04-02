const Band = require('../models/Bands')
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const bands = await Band.find({
      techs: {
          $in: techsArray,
      },
      location: {
          $near: {
              $geometry: {
                  type: 'Point',
                  coordinates: [longitude, latitude],
              },
              $maxDistance: 10000,
          }
      }
    });

    return res.json({ bands });
  }
};