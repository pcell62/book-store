import { Notification } from "../models/notificationModel.js";

export const postNotification = async (request, response) => {
  try {
    const { createdBy, createdFor, bookId } = request.body;

    const newNotification = {
      createdBy,
      createdFor,
      bookId,
    };

    const notification = await Notification.create(newNotification);

    return response.status(201).send(notification);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};
