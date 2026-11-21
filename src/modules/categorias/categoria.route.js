import { Router } from "express";
import { registrarLaCategoria, consultarLasCategorias, actualizarLaCategoria, eliminarLaCategoria } from "./categoria.controller.js";
const routerCategoria = Router()
routerCategoria.post("/registrar-categoria", registrarLaCategoria)
routerCategoria.get("/consultar-categoria", consultarLasCategorias)
routerCategoria.patch("/actualizar-categoria", actualizarLaCategoria)
routerCategoria.delete("/eliminar-categoria", eliminarLaCategoria)
export default routerCategoria