import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.js";
import bookRouter from "./routes/books.js";
const app = express();

// Middlewares
app.set("trust proxy", true);

app.use(
  cors({
    credentials: true,
    origin: new RegExp(process.env.CORS_ORIGIN || "http://localhost:5173"),
  })
);

app.use(helmet());

if (process.env.NODE_ENV === "developement") app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/books", bookRouter);

// Not found page - after routes and before error
app.use(notFoundHandler);

// errors
app.use(errorHandler);

export default app;
