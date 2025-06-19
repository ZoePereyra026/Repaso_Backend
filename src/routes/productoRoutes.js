const { Router } = require("express");
const productoController = require("../controllers/productoController");

const router = Router();

// Rutas específicas primero
router.get('/filtrar', productoController.filtrarPorPrecio);

// Luego las rutas con parámetros
router.get("/:codigo", productoController.getProductoByCodigo);

router.get("/", productoController.getAllProductos);
router.post("/", productoController.createProducto);
router.delete("/:codigo", productoController.deleteProducto);
router.put("/:codigo", productoController.updateProducto);

module.exports = router;