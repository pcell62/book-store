import { Book } from "../models/bookModel.js";

export const saveBook = async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.price
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear, price",
      });
    }
    const user_id = request.user._id;
    const user_name = request.user.name;
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      description:
        request.body.description ||
        "No description available, update to add one",
      user_id,
      createdBy: user_name,
      price: request.body.price,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getBooks = async (request, response) => {
  const user_id = request.user._id;
  try {
    const books = await Book.find({ user_id });

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getBooksAll = async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getBooksByUserInterest = async (request, response) => {
  try {
    const user_id = request.user._id;

    // Find books where the user is interested
    const books = await Book.find({ interestedPeople: { $in: [user_id] } });

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const getBookById = async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const updateBook = async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.price
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear, price",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const deleteBook = async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

export const interestBook = async (request, response) => {
  try {
    const user_id = request.user._id;
    const { id } = request.params;
    const book = await Book.findById(id);

    if (book.user_id.toString() === user_id.toString()) {
      return response
        .status(200)
        .json({ message: "You cannot interest your own book" });
    }

    if (book.interestedPeople.includes(user_id.toString())) {
      return response
        .status(200)
        .json({ message: "You have already expressed interest in this book" });
    }
    const result = await Book.findByIdAndUpdate(id, {
      $addToSet: { interestedPeople: user_id },
    });
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response
      .status(200)
      .send({ message: "Book Interested successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};
