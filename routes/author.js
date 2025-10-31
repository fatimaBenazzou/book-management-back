import { Router } from "express";
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../handlers/author.js";
import { CheckAuth, isAdmin } from "../middlewares/auth.js";
import {
  validateBodySchema,
  validateParamsSchema,
  validateQuerySchema,
} from "../middlewares/validations.js";
import { filterSchema, idParamsSchema } from "../validation/utils.js";
import { authorSchema, authorUpdateSchema } from "../validation/author.js";

const authorsRouter = Router();

// List all authors with search and pagination
authorsRouter
  .route("/")
  .get(validateQuerySchema(filterSchema), getAuthors)
  .post(CheckAuth, isAdmin, validateBodySchema(authorSchema), createAuthor);

// Get, update, delete specific author
authorsRouter
  .route("/:id")
  .all(validateParamsSchema(idParamsSchema))
  .get(getAuthorById)
  .put(CheckAuth, isAdmin, validateBodySchema(authorUpdateSchema), updateAuthor)
  .delete(CheckAuth, isAdmin, deleteAuthor);

export default authorsRouter;
