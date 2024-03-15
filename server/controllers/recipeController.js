// recipeController.js


require('../models/database');
const Category = require('../models/Category');
const Recipe=require('../models/Recipe');




exports.homepage = async (req, res) => {

  try{
    const limitNumber=5;
    const categories=await Category.find({}).limit(limitNumber);
    const latest=await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
    const thai= await Recipe.find({'category':'Thai'}).limit(limitNumber);
    const american= await Recipe.find({'category':'American'}).limit(limitNumber);
    const chinese= await Recipe.find({'category':'Chinese'}).limit(limitNumber);

    const food={chinese,thai,latest}; //i am adding thai,chinese,american and those which u want to display in landing page or else you can remove them and keep only latest
    
    res.render('index', { title: 'Cooking Blog - Home', food, categories });


  }catch(error){
    res.satus(500).send({message:error.message || "Error Occured"});
  }

}
  //get categories

  exports.exploreCategories = async (req, res) => {

    try{
      const limitNumber=20;
      const categories=await Category.find({}).limit(limitNumber);
      res.render('categories', { title: 'Cooking Blog - Categories' ,categories});
  
  
    }catch(error){
      res.satus(500).send({message:error.message || "Error Occured"});
    }
    
};


//get/categories/:id
//categories by id


exports.exploreCategoriesById = async (req, res) => {

  try{
    let categoryId=req.params.id;
    const limitNumber=20;
    const categoryById=await Recipe.find({'category': categoryId}).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categories' ,categoryById});


  }catch(error){
    res.satus(500).send({message:error.message || "Error Occured"});
  }
  
};




//post /search
//search

exports.searchRecipe = async(req, res) => {

  try{

    let searchTerm=req.body.searchTerm;
    let recipe=await Recipe.find({$text:{$search:searchTerm,$diacriticSensitive:true}});
    res.render('search',{title:'Cooking Blog- Search',recipe});
  }
  catch{
    res.satus(500).send({message:error.message || "Error Occured"});

  }

}


// get recipes/id
//in recipe page
  
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Cooking Blog - Recipe', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

 
//Get explore-latest
//explore latest


exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber=20;
    const recipe = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
    res.render('explore-latest',{title: 'Cooking Blog-Recipe',recipe});
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 





//Get /explore-random
//explore random
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();

    res.render('explore-random', { title: 'Cooking Blog - Explore Latest', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 



//Get /submit-recipe
//submit recipe
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}



/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {

  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
  }
}




// Delete Recipe

 async function deleteRecipe(){
   try {
     await Recipe.deleteOne({ name: 'jvjvjvj' });
   } catch (error) {
     console.log(error);
   }
 }
deleteRecipe(); 


// Update Recipe
/*
async function updateRecipe(){
   try {
     const res = await Recipe.updateOne({ name: 'Kadai' }, { name: 'Kadai Paneer' });
     res.n; // Number of documents matched
     res.nModified; // Number of documents modified
   } catch (error) {
     console.log(error);
   }
 }
 updateRecipe();*/

/*exports.updateRecipe = async (req, res) => {
  const { recipeNameToUpdate, newName } = req.body; // Extracting recipeNameToUpdate and newName from request body

  try {
    const result = await updateRecipe(recipeNameToUpdate, newName);
    res.json({ message: `${result.n} document(s) matched and ${result.nModified} document(s) modified.` });
  } catch (error) {
    console.log(error); // Log any errors that occur
    res.status(500).json({ error: error.message });
  }
}

async function updateRecipe(recipeNameToUpdate, newName) {
  try {
    const result = await Recipe.updateOne({ name: recipeNameToUpdate }, { name: newName });
    return result; // Return the result for potential further processing
  } catch (error) {
    throw error; // Propagate the error to the caller
  }
}

*/




// async function insertDymmyCategoryData(){
//       try {
//         await Category.insertMany([
//           {
//             "name": "Thai",
//             "image": "thai-food.jpg"
//           },
//           {
//             "name": "American",
//             "image": "american-food.jpg"
//           }, 
//           {
//             "name": "Chinese",
//             "image": "chinese-food.jpg"
//           },
//           {
//             "name": "Mexican",
//             "image": "mexican-food.jpg"
//           }, 
//           {
//             "name": "Indian",
//             "image": "indian-food.jpg"
//           },
//           {
//             "name": "Spanish",
//             "image": "spanish-food.jpg"
//           }
//         ]);
//       } catch (error) {
//         console.log('err', + error)
//       }
//     }

// insertDymmyCategoryData();


// async function insertDymmyRecipeData(){
//     try {
//       await Recipe.insertMany([
//         { 
//           "name": "Chinese steak tofu",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Chinese", 
//           "image": "chinese-steak-tofu-stew.jpg"
//         },
//         { 
//           "name": "Grilled Lobster Rolls",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Chinese", 
//           "image": "grilled-lobster-rolls.jpg"
//         },
//         { 
//           "name": "Key Lime Pie",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Chinese", 
//           "image": "key-lime-pie.jpg"
//         },
//         { 
//           "name": "Thai Green Curry",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Thai", 
//           "image": "thai-green-curry.jpg"
//         },
//         { 
//           "name": "Thai Inspired Vegetable Broth",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Thai", 
//           "image": "thai-inspired-vegetable-broth.jpg"
//         },
//         { 
//           "name": "Veggie Pad Thai",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Chinese", 
//           "image": "veggie-pad-thai.jpg"
//         },
//         { 
//           "name": "Thai Style Mussels",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Thai", 
//           "image": "thai-style-mussels.jpg"
//         },
//         { 
//           "name": "Thai Chinese Inspired Spinach Salad",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Thai", 
//           "image": "thai-chinese-inspired-pinch-salad.jpg"
//         },
//         { 
//           "name": "Thai Red Chicken Soup",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Thai", 
//           "image": "thai-red-chicken-soup.jpg"
//         },
//         { 
//           "name": "Chocolate Banoffe Whoopie Pies",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "American", 
//           "image": "chocolate-banoffe-whoopie-pies.jpg"
//         },
//         { 
//           "name": "Crab Cakes",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Indian", 
//           "image": "crab-cakes.jpg"
//         },
//         { 
//           "name": "Tom Daley",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Chinese", 
//           "image": "tom-daley.jpg"
//         },
//         { 
//           "name": "Stir Fried Vegetables",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "Mexican", 
//           "image": "stir-fried-vegetables.jpg"
//         },
//         { 
//           "name": "Southern Friend Chicken",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "American", 
//           "image": "southern-friend-chicken.jpg"
//         }
        
//       ]);
//     } catch (error) {
//       console.log('err', + error)
//     }
//   }
  
//   insertDymmyRecipeData();