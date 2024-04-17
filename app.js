import express from "express";

const app = express();
const port = 3001;

app.get("/hello-world", (req, res) => {
  res.json({
    msg: "Hello, World!",
  });
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
