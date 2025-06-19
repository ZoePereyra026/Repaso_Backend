const express = require("express");
require("dotenv").config();

const connectDB = require("./src/config/database");
const productoRoutes = require("./src/routes/productoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());


app.get("/", (req, res) => res.json({ message: "Hola, Mundo!" }));
app.use("/api/productos", productoRoutes);
app.use("/api/productos/:codigo", productoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
