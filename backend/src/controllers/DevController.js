const axios = require("axios");
const Dev = require("../models/Devs");
const parseStringAsArray = require("../utils/parseStringAsArray");

//index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    if (devs.length != []) {
      return res.status(202).json(devs);
    } else {
      return res.status(404).json({
        message: "Oops! we couldn't load our base, please try again",
      });
    }
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${github_username}`
        );

        const { name = login, avatar_url, bio } = response.data;

        //ARRUMAR QUANDO NAME É NULL

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

        return res.status(201).json({
          type: "success",
          message: `Welcome, ${dev.name} !`,
          dev: dev,
        });
      } catch (error) {
        // Error
        if (error.response) {
          return res.status(200).json({
            type: "error",
            message: "Oops! seems this user doesn't exists",
          });
        } else if (error.request) {
          return res.status(200).json({
            type: "error",
            message: "Oops! we couldn't connect to our server",
          });
        } else {
          return res.status(500);
        }
      }
    } else {
      return res.status(200).json({
        type: "error",
        message: "Oops! you are already registered",
        dev: dev,
      });
    }
  },

  async update(req, res) {
    const github_username = req.params.dev_name;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      try {
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
              res.status(500).json({
                type: "error",
                message: "Oops! something went wrong" });
            } else {
              return doc;
            }
          }
        );
        return res.status(201).json({
          type: "success",
          message: "Success! your info is up to date",
          dev_updated: dev_updated,
        });
      } catch (error) {
        // Error
        if (error.response) {
          return res.status(404);
        } else if (error.request) {
          return res.status(404);
        } else {
          return res.status(500);
        }
      }
    } else {
      return res.status(202).json({
        message: "Oops! seems you are not registered yet",
      });
    }
  },

  /*async update(req, res) {
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
        message: "Success! your info is up to date ;)",
        dev_updated: dev_updated,
      });
    } else {
      return res.json({
        message: "Oops! we couldn't find this user :(",
      });
    }
  },*/

  /*
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });
    //console.log(band)

    if (!dev) {
      try{}catch(error){}
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      //// HANDLE ERRO AO DIGITAR UM USUARIO ERRADO ////

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
    }*/
};

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
