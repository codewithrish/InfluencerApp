const Skill = require("../../models/skill");
const { transformSkill } = require("./merge");
module.exports = {
  skills: async () => {
    try {
      const skills = await Skill.find();
      return skills.map((skill) => {
        return transformSkill(skill);
      });
    } catch (err) {
      throw err;
    }
  },

  createSkill: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const skill = new Skill({
        name: args.skillInput.name
      });
      const result = await skill.save();
      return transformSkill(result);
    } catch (err) {
      throw err;
    }
  },
};
