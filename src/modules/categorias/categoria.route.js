import { Router } from "express";
import { registrarLaCategoria, consultarLasCategorias } from "./categoria.controller.js";
const routerCategoria = Router()
routerCategoria.post("/registrar-categoria", registrarLaCategoria)
routerCategoria.get("/consultar-categoria", consultarLasCategorias)
export default routerCategoria