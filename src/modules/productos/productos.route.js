import { Router } from "express";
import { registrarElProducto, consultarLosProductos, actualizarElProducto, eliminarElProducto } from "./productos.controller.js";
const routerProducto = Router()
routerProducto.post("/registrar-producto", registrarElProducto)
routerProducto.get("/consultar-producto", consultarLosProductos)
routerProducto.patch("/actualizar-producto", actualizarElProducto)
routerProducto.delete("/eliminar-producto", eliminarElProducto)
export default routerProducto