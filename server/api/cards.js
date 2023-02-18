const axios = require('axios');
const { Router } = require('express');
const AddCard = require('../models/cards');
const options = ({
  headers: {"X-Api_Key" : process.env.API_KEY}
})

const router = Router();

router.get('/:query', async (req, res, next) => {
  let query = req.query;
  console.log(query);
  try {
    const searchCardsByName = await axios.get("https://api.pokemontcg.io/v2/cards", {
      options,
      params: {"q" : "name:" + query.name}
    });
    res.json(searchCardsByName.data);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const cardEntry = new AddCard(req.body);
    const createdEntry = await cardEntry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    const entries = await AddCard.find();
    console.log(entries);
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

module.exports = router ;
