const { Recipe } = require("../models");

class RecipeController {
  static async getAllrecipe(req, res, next) {
    try {
      const data = await Recipe.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllUserRecipes(req,res,next){
    try {

      let {id} = req.user
      
      
      const data = await Recipe.findAll({
        where : {
          UserId : id
        }
      }) 


      res.status(200).json(data);
      

    } catch (error) {
      next(error)
    }
  }

  static async getRecipebyId(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Recipe.findByPk(id);

      if (!data) {
        throw { name: "not found" };
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addRecipe(req, res, next) {
    try {
      let new_recipe = await Recipe.create({
        ...req.body,
        UserId: req.user.id,
      });

      res.status(201).json(new_recipe);
    } catch (error) {      
      next(error);
    }
  }

  static async editRecipe(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      const recipe = await Recipe.findByPk(id);

      if (!recipe) {
        throw { name: "not found" };
      }

      if (user_id !== recipe.UserId) {
        throw { name: "Forbidden" };
      }

      await Recipe.update(req.body, {
        where: {
          id: id,
        },
      });

      let Updated_recipe = await Recipe.findByPk(id);
      res.status(200).json(Updated_recipe);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRecipe(req, res,next) {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      const recipe = await Recipe.findByPk(id);

      if (!recipe) {
        throw { name: "not found" };
      }

      if (recipe.UserId !== user_id) {
        throw { name: "Forbidden" };
      }

      await Recipe.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: `delete recipe ${recipe.title} success` });

    } catch (error) {
      next(error)
    }
  }
}

module.exports = RecipeController;
