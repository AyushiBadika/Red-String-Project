import EventModel from "../models/event.model.js";
import { errorHandler } from "../utils/error.js";

export const createEvent = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const event = await EventModel.create({ ...req.body, userId });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getUserEvent = async (req, res, next) => {
  try {
    const events = await EventModel.find({ userId: req.user.id });

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id).populate("users", "username email");

    if (!event) {
      return next(errorHandler({ statusCode: 404, message: "Event not found!" }));
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};
export const getEvents = async (req, res, next) => {
  try {
    const event = await EventModel.find({}).sort({ createdAt: -1 });

    if (!event) {
      return next(errorHandler({ statusCode: 404, message: "Event not found!" }));
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  const event = await EventModel.findById(req.params.id);

  if (!event) {
    return next(errorHandler({ statusCode: 404, message: "Event not found!" }));
  }

  if (req.user.id !== event.userId) {
    return next(errorHandler({ statusCode: 401, message: "You can only delete your own events" }));
  }
  try {
    await EventModel.findOneAndDelete({ userId: req.user.id });

    res.status(200).json("Event has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  const event = await EventModel.findById(req.params.id);

  if (!event) {
    return next(errorHandler({ statusCode: 404, message: "Event not found!" }));
  }

  if (req.user.id !== event.userId) {
    return next(errorHandler({ statusCode: 401, message: "You can only update your own events" }));
  }
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  const event = await EventModel.findById(req.params.id);
  console.log(req.user);
  const userId = req.user.id;

  if (!event) {
    return next(errorHandler({ statusCode: 404, message: "Event not found!" }));
  }

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(event._id, { $addToSet: { users: userId } }, { new: true });

    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};
