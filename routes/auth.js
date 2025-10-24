import { Router } from "express";
import { register } from "../handlers/auth.js";

const authRouter = Router();

authRouter.get("/", () => {});
authRouter.post("/login", () => {});
authRouter.post("/register", register);

export default authRouter;
