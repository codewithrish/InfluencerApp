const Category = require("../../models/category");
const { transformCategory } = require("./merge");
module.exports = {
  categories: async () => {
    try {
      const categories = await Category.find();
      return categories.map((category) => {
        return transformCategory(category);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createCategory: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const category = new Category({
        name: args.categoryInput.name
      });
      const result = await category.save();
      return transformCategory(result);
    } catch (err) {
      throw err;
    }
  },
};
