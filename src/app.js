import express from 'express'
import routerCategoria from './modules/categorias/categoria.route.js'
const app = express()
app.use(express.json())
app.use("/categorias", routerCategoria)
export default app