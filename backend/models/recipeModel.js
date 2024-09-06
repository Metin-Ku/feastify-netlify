const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingredientSchema = new Schema({
  quantity: Number,
  unit: String,
  description: String,
});

const recipeSchema = new Schema({
  publisher: String,
  ingredients: [ingredientSchema],
  source_url: String,
  image_url: String,
  title: String,
  servings: Number,
  cooking_time: Number,
  id: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
