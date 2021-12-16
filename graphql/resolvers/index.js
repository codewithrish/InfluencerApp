const authResolver = require("./auth");
const bookingsResolver = require("./bookings");
const eventsResolver = require("./events");
const nicheResolver = require("./niche");
const categoryResolver = require("./category");
const contractResolver = require("./contract");
const skillResolver = require("./skill");

const rootResolver = {
  ...authResolver,
  ...bookingsResolver,
  ...eventsResolver,
  ...nicheResolver,
  ...categoryResolver,
  ...skillResolver,
  ...contractResolver
};

module.exports = rootResolver;
