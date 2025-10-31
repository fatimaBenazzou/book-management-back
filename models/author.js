import { Schema, model } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual populate for books
authorSchema.virtual("books", {
  ref: "books",
  localField: "_id",
  foreignField: "author",
});

const authorModel = model("authors", authorSchema);
export default authorModel;
