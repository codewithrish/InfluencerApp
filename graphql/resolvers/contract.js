const Contract = require("../../models/contract");
const { transformContract } = require("./merge");
module.exports = {
  contracts: async () => {
    try {
      const contracts = await Contract.find();
      return contracts.map((contract) => {
        return transformContract(contract);
      });
    } catch (err) {
      throw err;
    }
  },

  createContract: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const contract = new Contract({
        name: args.contractInput.name
      });
      const result = await contract.save();
      return transformContract(result);
    } catch (err) {
      throw err;
    }
  },
};
