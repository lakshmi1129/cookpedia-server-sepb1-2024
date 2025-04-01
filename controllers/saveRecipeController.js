const saveRecipes = require("../models/saveRecipeModel")

// add to collection - save recipe
exports.addSavedRecipeController = async (req,res)=>{
    console.log("Inside addSavedRecipeController");
    const {id} = req.params
    const userId = req.userId
    const { name,image} = req.body
    try{
        const existingRecipe = await saveRecipes.findOne({recipeId:id,userId})
        if(existingRecipe){
            res.status(406).json("Already Saved Recipe!!!!")
        }else{
            const newRecipe = new saveRecipes({
                recipeId:id,
               name,image,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        res.status(401).json(err)
    } 
}


// user recipe collection -get - authorized
exports.getUserRecipeController = async (req,res)=>{
    console.log("Inside getUserRecipeController");
    const userId = req.userId
    try{
        const userRecipe = await saveRecipes.find({userId})
            res.status(200).json(userRecipe) 
    }catch(err){
        res.status(401).json(err)
    } 
}

// remove recipe collection -delete - authorized
exports.removeRecipeController = async (req,res)=>{
    console.log("Inside removeRecipeController");
    const {id}=req.params
    console.log(id);
    try{
        const removeRecipe = await saveRecipes.findByIdAndDelete({_id:id})
        console.log(removeRecipe);
        res.status(200).json(removeRecipe) 
    }catch(err){
        res.status(401).json(err)
    } 
}