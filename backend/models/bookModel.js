import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "No description available, update to add one",
    },
    user_id: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    interestedPeople: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
