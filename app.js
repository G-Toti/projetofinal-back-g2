import express from "express";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use("/public", express.static("public"));

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
