import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3333;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
  });
});
