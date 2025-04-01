const recipes = require("../models/recipeModel")

// get all recipes
exports.getAllRecipeController = async(req,res)=>{
    console.log("Inside getAllRecipeController");
    try{
        const allrecipes = await recipes.find()
        res.status(200).json(allrecipes)
    }catch(err){
        res.status(401).json(err)
    }    
}



// get -  recipes, authorized user
exports.getARecipeController = async(req,res)=>{
    console.log("Inside getARecipeController");
    // fetch dynamic value
    const {id} = req.params
    try{
        const recipeDetails = await recipes.findById({_id:id})       
        res.status(200).json(recipeDetails)
    }catch(err){
        res.status(401).json(err)
    }    
}


// related  -  recipes, authorized user
exports.relatedRecipeController = async(req,res)=>{
    console.log("Inside relatedRecipeController");
    const cuisine = req.query.cuisine
    try{
        const allRelatedRecipes = await recipes.find({cuisine})       
        res.status(200).json(allRelatedRecipes)
    }catch(err){
        res.status(401).json(err)
    }    
}

// add-recipe
exports.addRecipeController = async(req,res)=>{
    console.log("Inside addRecipeController");
    const { name,ingredients, instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{
        const existingRecipe = await recipes.findOne({name}) 
        if(existingRecipe){
            res.status(406).json("Recipe Already Exists Please add another One!!!")
        }else{
            const newRecipe = new recipes({
                name,ingredients, instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    }    
}

// edit-recipe
exports.editRecipeController = async(req,res)=>{
    console.log("Inside editRecipeController");
    const {id}= req.params
    const { name,ingredients, instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    try{
       
            const updatedRecipe = await recipes.findByIdAndUpdate({_id:id},{name,ingredients, instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType},
               {new:true})
            await updatedRecipe.save()
            res.status(200).json(updatedRecipe)
    
    }catch(err){
        res.status(401).json(err)
    }    
}

// delete-recipe
exports.deleteRecipeController = async(req,res)=>{
    console.log("Inside deleteRecipeController");
    const {id}= req.params
    try{ 
            const removedRecipe = await recipes.findByIdAndDelete({_id:id})
            res.status(200).json(removedRecipe)
    
    }catch(err){
        res.status(401).json(err)
    }    
}