import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
