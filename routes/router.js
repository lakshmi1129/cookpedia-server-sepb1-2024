const express = require("express")
const recipeController = require('../controllers/recipeController')
const testimonyController = require('../controllers/testimonyController')
const userController = require("../controllers/userController")
const downloadController = require("../controllers/downloadController")
const saveRecipeController = require("../controllers/saveRecipeController")

const jwtMiddleware = require("../middlewares/jwtMiddleware")


const router = new express.Router()

// all-recipes
router.get("/all-recipes",recipeController.getAllRecipeController)

// add-testimony
router.post("/add-testimony",testimonyController.addTestimonyController)

// add-user
router.post("/register",userController.addUserController)

// login
router.post("/login",userController.loginController)

// View Single Recipe
router.get("/recipe/:id/view",jwtMiddleware,recipeController.getARecipeController)

// Related Recipes
router.get("/related-recipes",jwtMiddleware,recipeController.relatedRecipeController)


// download Recipes
router.post("/recipe/:id/download",jwtMiddleware,downloadController.addDownloadRecipeController)


// save Recipe
router.post("/recipe/:id/save",jwtMiddleware,saveRecipeController.addSavedRecipeController)

// get user save Recipe
router.get("/get-save-recipe",jwtMiddleware,saveRecipeController.getUserRecipeController)


// delete user saved Recipe
router.delete("/save-recipe/:id/remove",jwtMiddleware,saveRecipeController.removeRecipeController)

// get user download Recipes
router.get("/user-downloads",jwtMiddleware,downloadController.getUserDownloadRecipeController)

// edit-user
router.post("/user/edit",jwtMiddleware,userController.editUserController)


// get-all-user
router.get("/all-users",jwtMiddleware,userController.getAllUserController)


// get all download list
router.get("/download-list",jwtMiddleware,downloadController.getAllDownloadListController)

// get-testimony
router.get("/all-testimony",jwtMiddleware,testimonyController.getAllTestimonyController)


// update-testimony
router.get("/feedback/:id/update",jwtMiddleware,testimonyController.updateTestimonyStatusController)

// get-approved-testimony
router.get("/all-approved-testimony",testimonyController.getApprovedTestimonyController)


// add-recipe
router.post("/add-recipe",jwtMiddleware,recipeController.addRecipeController)


// edit-recipe
router.put("/recipe/:id/edit",jwtMiddleware,recipeController.editRecipeController)


// delete-recipe
router.delete("/recipe/:id/remove",jwtMiddleware,recipeController.deleteRecipeController)


module.exports = router