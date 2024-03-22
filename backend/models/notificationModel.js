import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    createdFor: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("Notification", notificationSchema);
