import { Types } from "mongoose";
import bookModel from "../models/books.js";
import { successResponse } from "../utils/responseFormatter.js";
import { StatusCodes } from "http-status-codes";

export async function getBooks(req, res) {
  try {
    const { search, category, sortBy, sortOrder, limit, page } =
      req.parsedQuery;
    const filter = search ? { $text: { $search: search } } : {};
    if (category) {
      filter.category = Types.ObjectId(category);
    }

    const books = await bookModel
      .find(filter)
      .populate("author", "name")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ [sortBy]: sortOrder });

    return successResponse(res, books, "Books fetched successfully");
  } catch (error) {
    return errorResponse(
      res,
      error,
      "Failed to fetch books",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
