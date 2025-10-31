import { Router } from "express";
import { getBooks } from "../handlers/books.js";
import { CheckAuth, isAdmin } from "../middlewares/auth.js";

const bookRouter = Router();

bookRouter.route("/").get(getBooks).post(CheckAuth, isAdmin, createBook);
bookRouter.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default bookRouter;
