import * as userController from "../controllers/user.controllers.js";
import express from "express";

const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.login);

export default router;
