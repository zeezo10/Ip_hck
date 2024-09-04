const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const RecipeController = require("../controller/recipeController");
const {User} =require("../models");
const { verifyToken } = require("../helper/jwt");
const errorHandeler = require("../middlewear/errorHendeller")
const cors = require("cors")

router.use(cors())

router.post("/auth/google",UserController.googleAouth)

router.post("/register", UserController.registerUser);

router.post("/login",UserController.loginUser)


//----------------

async function authentincation(req, res, next) {
    try {
        
      const access_token = req.headers.authorization;
  
      if (!access_token) {
        throw { name: "unauthentincate" };
      }
  
      let [bearer, token] = access_token.split(" ");
  
      if (bearer !== "Bearer" || !token || !bearer) {
        throw { name: "unauthentincate" };
      }
  
      const payload = verifyToken(token);
  
      const user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: "unauthentincate" };
      }
  
      req.user = {
        id: user.id,
        email: user.email,
      };
  
      next();
    } catch (error) {
    //   next(error);
    console.log(error);
    
    }
  }



router.get("/user/:id",UserController.getUserById)

router.get("/recipes",authentincation, RecipeController.getAllrecipe)
router.post("/recipes",authentincation,RecipeController.addRecipe)

router.get("/recipes/user",authentincation,RecipeController.getAllUserRecipes)
router.get("/recipes/:id",authentincation , RecipeController.getRecipebyId)

router.put("/recipes/:id",authentincation,RecipeController.editRecipe)
router.delete("/recipes/:id",authentincation,RecipeController.deleteRecipe)

router.post ("/ai",authentincation,UserController.ai)

router.use(errorHandeler);


module.exports = router