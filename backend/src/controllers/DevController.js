const axios = require("axios");
const Dev = require("../models/Devs");
const parseStringAsArray = require("../utils/parseStringAsArray");

//index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    if (devs.length != []) {
      return res.json(devs);
    } else {
      return res.json({ message: "No users found" });
    }
  },

  /* async destroy(req, res) {
    await Dev.findOneAndDelete(
      { github_username: req.params.dev_name },
      (err, dev) => {
        // As always, handle any potential errors:
        if (err)
          return res.json({
            menssage: "This user is not registered in our records",
            status: err,
          });
        const response = {
          message: "Dev deleted with success",
          name: req.params.band_name,
        };
        return res.json(response);
      }
    );
  },*/

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    //console.log(band)

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    } else {
      console.log("chegou aqui");
      return res.json({
        message:
          "Oops! it seems that you are already registered in our system ;)",
      });
    }

    //return res.json(dev);
    return res.json({
      message: `Hello ${dev.name}, welcome! ;)`,
      dev: dev,
    });
  },

  async update(req, res) {
    const github_username = req.params.dev_name;
    console.log(`Username to find: ${github_username}`);

    let dev = await Dev.findOne({ github_username });
    console.log(`BEFORE: ${dev}`);

    if (dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { avatar_url, bio } = response.data;

      let dev_updated = await Dev.findOneAndUpdate(
        { github_username: github_username },
        {
          avatar_url: avatar_url,
          bio: bio,
          $currentDate: { updated_at: true },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            res.json({ message: "Oops! something went wrong :(" });
          } else {
            console.log(doc);
            return doc;
          }
        }
      );
      return res.json({
        message: "Success! your info is up to date",
        dev_updated: dev_updated,
      });
    } else {
      return res.json({
        message: "Oops! we couldn't find this user :(",
      });
    }
  },
};
