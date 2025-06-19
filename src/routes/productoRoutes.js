const { Router } = require("express");
const productoController = require("../controllers/productoController");

const router = Router();

// Rutas reales de tu API
router.get("/", productoController.getAllProductos);
router.get("/:codigo", productoController.getProductoByCodigo);
router.post("/", productoController.createProducto);
router.delete("/:codigo", productoController.deleteProducto);
router.put("/:codigo", productoController.updateProducto);

module.exports = router;

