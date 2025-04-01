const downloadRecipes = require("../models/downloadModel")

// add to dwonloadrecipes
exports.addDownloadRecipeController = async (req,res)=>{
    console.log("Inside addDownloadRecipeController");
    const {id} = req.params
    const userId = req.userId
    const { name,image,cuisine} = req.body
    try{
        const existingRecipe = await downloadRecipes.findOne({recipeId:id})
        if(existingRecipe){
            existingRecipe.count +=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newRecipe = new downloadRecipes({
                recipeId:id,
                recipeName:name,
                recipeImage:image,
                recipeCuisine:cuisine,
                count:1,
                userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(err){
        req.status(401).json(err)
    } 
}

// get dwonloadrecipes
exports.getUserDownloadRecipeController = async (req,res)=>{
    console.log("Inside getUserDownloadRecipeController");
    const userId = req.userId
    try{
        const allUserDownloadList = await downloadRecipes.find({userId})
        res.status(200).json(allUserDownloadList)
       
    }catch(err){
        req.status(401).json(err)
    } 
}

// get all Downloads
exports.getAllDownloadListController = async (req,res)=>{
    console.log("Inside getAllDownloadListController");
    try{
        const allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    }catch(err){
        req.status(401).json(err)
    } 
}