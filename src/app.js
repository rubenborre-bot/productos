import express from 'express'
import routerCategoria from './modules/categorias/categoria.route.js'
import routerProducto from './modules/productos/productos.route.js'
const app = express()
app.use(express.json())
app.use("/categorias", routerCategoria)
app.use("/productos", routerProducto)
export default app