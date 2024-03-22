import express from "express";
import {
  saveBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksAll,
  interestBook,
  getBooksByUserInterest,
} from "../controllers/bookControllers.js";

import { requireAuth } from "../middleware/requireAuth.js";
import { postNotification } from "../controllers/notifControllers.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", saveBook);
router.get("/allbooks", getBooksAll);
router.get("/", getBooks);
router.post("/notification/:id", postNotification);

router.get("/interest", getBooksByUserInterest);

router.get("/:id", getBookById);

router.put("/:id", updateBook);

router.put("/interest/:id", interestBook);

router.delete("/:id", deleteBook);

export default router;
