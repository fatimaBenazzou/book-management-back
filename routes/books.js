import { Router } from "express";
import { getBooks } from "../handlers/books";
import { CheckAuth, isAdmin } from "../middlewares/auth";

const bookRouter = Router();

bookRouter.route("/").get(getBooks).post(CheckAuth, isAdmin, createBook);
bookRouter.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default bookRouter;
