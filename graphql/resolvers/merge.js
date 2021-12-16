const DataLoader = require("dataloader");
const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const transformNiche = (niche) => {
  return {
    ...niche._doc
  };
};

const transformCategory = (category) => {
  return {
    ...category._doc
  };
};

const transformSkill = (skill) => {
  return {
    ...skill._doc
  };
};
const transformContract = (contract) => {
  return {
    ...contract._doc
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

const singleEvent = async (eventId) => {
  try {
    // const event = await Event.findById(eventId);
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      password: null,
      // createdEvents: events.bind(this, user._doc.createdEvents),
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
exports.transformNiche = transformNiche;
exports.transformCategory = transformCategory;
exports.transformContract = transformContract;
exports.transformSkill = transformSkill;

// exports.singleEvent = singleEvent;
// exports.user = user;
// exports.events = events;
