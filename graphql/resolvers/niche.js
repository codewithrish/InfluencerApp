const Niche = require("../../models/niche");
const { transformNiche } = require("./merge");
module.exports = {
  niches: async () => {
    try {
      const niches = await Niche.find();
      return niches.map((niche) => {
        return transformNiche(niche);
      });
    } catch (err) {
      throw err;
    }
  },

  createNiche: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const niche = new Niche({
        name: args.nicheInput.name
      });
      const result = await niche.save();
      return transformNiche(result);
    } catch (err) {
      throw err;
    }
  },
};
