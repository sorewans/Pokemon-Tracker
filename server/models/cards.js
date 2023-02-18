//import mongoose, { model } from 'mongoose';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardEntrySchema = new Schema({
  name: String,
  id: String,
  supertype: String,
  subtypes: Array,
  hp: String,
  types: Array,
  evolvesTo: Array,
  flavorText: String,
  attacks: Array,
  weaknesses: Array,
  setsName: String,
  setsSeries: String,
  setsId: String,
  seriesSymbol: String,
  seriesLogo: String,
  number: String,
  artist: String,
  rarity: String,
  imageUrl: String,
  imageLarge: String
},
{
  timestamps: true,
});

const AddCard = mongoose.model('cards', cardEntrySchema);

module.exports = AddCard;