const express=require('express');
const router=express.Router();
const recipeController=require('../controllers/recipeController');

router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);

router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories/:id', recipeController.exploreCategoriesById );

router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random',recipeController.exploreRandom);
router.get('/submit-recipe',recipeController.submitRecipe);

router.post('/submit-recipe',recipeController.submitRecipeOnPost);

router.get('/aboutus', (req, res) => {
    res.sendFile('D:/CookingBlog/aboutus.html'); // Replace 'path/to/aboutus.html' with the actual path to your aboutus.html file
  });

//router.post('/update-recipe', recipeController.updateRecipe);
module.exports=router;