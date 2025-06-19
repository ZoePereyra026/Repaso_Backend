const Producto = require("../models/producto");

// Obtener todos los productos (con filtro opcional por categoría)
// Este controlador maneja la obtención de todos los productos, permitiendo filtrar por categoría si se proporciona.
const getAllProductos = async (req, res) => {
  console.log("📡 Entró a getAllProductos");

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

// Filtrar productos por rango de precios
const filtrarPorPrecio = async (req, res) => {
  const { precioMin, precioMax } = req.query;

  // Convierte los parámetros a números
  const min = parseFloat(precioMin) || 0;
  const max = parseFloat(precioMax) || Number.MAX_SAFE_INTEGER;

  try {
    const productos = await Producto.find({
      precio: { $gte: min, $lte: max }
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al filtrar productos", detalle: error.message });
  }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
  const { codigo, nombre, precio, categorias } = req.body;

  // Validar que todos los campos sean obligatorios
  if (!codigo || !nombre || !precio || !categorias) {
    return res.status(400).json({ error: "Todos los campos son necesarios" });
  }

  try {
    // Verificar si ya existe un producto con ese código
    const productoExistente = await Producto.findOne({ codigo: parseInt(codigo) });
    if (productoExistente) {
      return res.status(409).json({ error: "El producto ya existe" });
    }

    // Crear y guardar el nuevo producto
    const nuevoProducto = new Producto({
      codigo: parseInt(codigo),
      nombre,
      precio,
      categorias,
    });

    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto", detalle: error.message });
  }
};

// Actualizar producto por código PUT 
const updateProducto = async (req, res) => {
  const { codigo } = req.params;
  const { nombre, precio, categorias } = req.body;

  if (!nombre && !precio && !categorias) {
    return res.status(400).json({ error: "Se debe proporcionar al menos un campo para actualizar" });
  }

  try {
    const producto = await Producto.findOne({ codigo: parseInt(codigo) });

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (nombre) producto.nombre = nombre;
    if (precio) producto.precio = precio;
    if (categorias) producto.categorias = categorias;

    await producto.save();

    res.status(200).json(producto); 
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto", detalle: error });
  }
};


// Eliminar producto por código
const deleteProducto = async (req, res) => {
  const codigo = parseInt(req.params.codigo);

  if (isNaN(codigo)) {
    return res.status(400).json({ error: "El código debe ser un número válido" });
  }

  try {
    const productoBorrado = await Producto.findOneAndDelete({ codigo });

    productoBorrado
      ? res.json({ message: "Producto eliminado", producto: productoBorrado })
      : res.status(404).json({ message: "Producto no encontrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto", detalle: error });
  }
};


module.exports = {
  getAllProductos,
  getProductoByCodigo,
  filtrarPorPrecio, 
  createProducto,
  deleteProducto,
  updateProducto,
};
