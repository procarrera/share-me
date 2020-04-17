const Dev = require("../models/Devs");

module.exports = {
  async index(req, res) {
    const { techs } = req.query;

    //const techsArray = parseStringAsArray(techs);

    /*const devs = await Dev.find({
      techs: {
        $in: techsArray
      }
    });*/
    const devs = await Dev.find(
      { $text: { $search: techs } },
      { score: { $meta: "textScore" } }
   ).sort( { score: { $meta: "textScore" } } )
    return res.json({ devs });
  },
};
