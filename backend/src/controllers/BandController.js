const axios = require("axios");
const Band = require("../models/Bands");
const parseStringAsArray = require("../utils/parseStringAsArray");

//index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const bands = await Band.find();
    return res.json(bands);
  },

  async destroy(req, res) {
    await Band.findOneAndDelete(
      { github_username: req.params.band_name },
      (err, band) => {
        // As always, handle any potential errors:
        if (err)
          return res.json({
            menssage: "essa banda nao existe em nossos cadastros",
            status: err
          });
        const response = {
          message: "Band successfully deleted",
          name: req.params.band_name
        };
        return res.json(response);
      }
    );
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let band = await Band.findOne({ github_username });
    //console.log(band)

    if (!band) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      band = await Band.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    } else {
      //console.log("ja existe");
    }

    return res.json(band);
  }
};
