const express = require("express");
const mongoose = require("mongoose");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());

// Conexão com MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/pedidos")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Rotas
app.use("/", orderRoutes);

// Rodar servidor
app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
