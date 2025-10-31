import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      original: {
        type: Number,
      },
      current: {
        type: Number,
        required: true,
      },
    },
    rentalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    lateFeePerDay: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      default: 0,
    },
    availableStock: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in-shelf", "out-of-stock"],
      default: "in-shelf",
    },
    description: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    keywords: [{ type: String }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre("save", function (next) {
  if (this.availableStock > this.totalStock) {
    return next(new Error("Available stock cannot exceed total stock"));
  }

  // Auto-calculate status based on availableStock
  if (this.availableStock === 0) {
    this.status = "out-of-stock";
  } else {
    this.status = "in-shelf";
  }

  next();
});

bookSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.$set && update.$set.availableStock !== undefined) {
    update.$set.status =
      update.$set.availableStock === 0 ? "out-of-stock" : "in-shelf";
  }
  next();
});

const bookModel = model("book", bookSchema);
export default bookModel;
