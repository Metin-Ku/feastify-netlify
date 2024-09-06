const express = require('express');
const recipeController = require('./../controllers/recipeController');
const authController = require('./../controllers/authController');
const verifyJWT = require('./../middlewares/verifyJWT');
const router = express.Router();
// router.param('id', recipeController.checkID);

// POST /recipe/234fad4/reviews
// GET /recipe/234fad4/reviews

router
  .route('/top-5-cheap')
  .get(recipeController.aliasTopRecipes, recipeController.getAllRecipes);

router
  .route('/')
  .get(
    // verifyJWT,
    recipeController.getAllRecipes
  )
  .post(
    // verifyJWT,
    // authController.restrictTo('admin'),
    recipeController.createRecipe
  );

router
  .route('/:id')
  .get(recipeController.getRecipe)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.uploadRecipeImages,
    recipeController.resizeRecipeImages,
    recipeController.updateRecipe
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.deleteRecipe
  );

module.exports = router;
