const Producto = require("../models/producto");

// Obtener todos los productos (con filtro opcional por categoría)
// Este controlador maneja la obtención de todos los productos, permitiendo filtrar por categoría si se proporciona.
const getAllProductos = async (req, res) => {
  const categoria = req.query.categoria;
  const query = !categoria
    ? {}
    : { categorias: { $regex: categoria, $options: "i" } };

  try {
    const productos = await Producto.find(query);
    if (productos.length === 0) {
      res.status(404).json({ message: "No se encontraron productos" });
    } else {
      res.json(productos);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos", detalle: error });
  }
};

// Obtener un producto por código
const getProductoByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const producto = await Producto.findOne({ codigo: parseInt(codigo) });
    if (!producto) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json(producto);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar producto", detalle: error });
  }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  try {
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto", detalle: error });
  }
};

// Actualizar producto por código
const updateProducto = async (req, res) => {
  const { codigo } = req.params;
  try {
    const actualizado = await Producto.findOneAndUpdate(
      { codigo: parseInt(codigo) },
      req.body,
      { new: true }
    );
    if (!actualizado) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json(actualizado);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto", detalle: error });
  }
};

// Eliminar producto por código
const deleteProducto = async (req, res) => {
  const { codigo } = req.params;
  try {
    const eliminado = await Producto.findOneAndDelete({ codigo: parseInt(codigo) });
    if (!eliminado) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json(eliminado);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto", detalle: error });
  }
};

module.exports = {
  getAllProductos,
  getProductoByCodigo,
  createProducto,
  deleteProducto,
  updateProducto,
};
