const axios = require("axios");

async function NewsAPI(terms) {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=` +
      `${terms}` +
      `&language=en` +
      `&sortBy=relevancy` +
      `&pageSize=100` +
      `&apiKey=5e1805fb09874fa09e9839c546659305`
  );
  return response.data;
}

module.exports = {
  async index(req, res) {
    const keywords = req.query.keywords;
    console.log(keywords);
    //console.log(encodeURIComponent(keywords));
    try {
      const response = await NewsAPI(keywords);
      console.log(response);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};
