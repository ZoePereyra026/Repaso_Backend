// Este archivo define el modelo de datos para los productos en la base de datos MongoDB.
// Este modelo se utiliza para crear, leer, actualizar y eliminar productos en la aplicación.
// src/models/producto.js

const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  categorias: {
    type: [String],
    required: true
  }
});

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;
