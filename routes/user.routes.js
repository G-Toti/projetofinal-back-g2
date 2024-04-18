import * as userController from "../controllers/user.controllers.js";
import express from "express";

const router = express.Router();

router.post("/", userController.createUser);

export default router;
