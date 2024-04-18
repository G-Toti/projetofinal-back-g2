import * as userController from "../controllers/user.controllers.js";
import express from "express";

const router = express.Router();

router.post("/", userController.createUser); // rota para criar usuário
router.post("/login", userController.login); // rota para login do usuário

export default router;
