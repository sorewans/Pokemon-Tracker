//const axios = require('axios');
const { Router } = require('express');
const AddCard = require('../models/cards');

const router = Router();


router.get('/', async (req, res, next) => {
  try {
    const entries = await AddCard.find();
    res.json(entries);
    // const count = await AddCard.countDocuments();
    // console.log(count);
    // res.json(count);

  } catch (error) {
    next(error);
  }
});

router.get('/count', async (req, res, next) => {
  try {
    const count = await AddCard.countDocuments();
    res.json(count);

  } catch (error) {
    next(error);
  }
});

module.exports = router ;