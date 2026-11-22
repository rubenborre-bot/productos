import { registrarProducto, consultarProducto, actualizarProducto, eliminarProducto} from "./productos.service.js"
export async function registrarElProducto(req, res) {
    try {
        const respuesta = await registrarProducto(req.body.nombre,  req.body.nombreCategoria, req.body.nombreCar, req.body.valorCar, req.body.precio, req.body.stock)
        if(respuesta.success){
            res.status(200).json({
                success:true,
                message: respuesta.message
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: respuesta.message
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message: "Error al registrar el producto"
        })
    }
}
export async function consultarLosProductos(req, res) {
    try {
        if(req.query.nombre == undefined){
        const respuesta = await consultarProducto()
        if(respuesta.success){
            res.status(200).json({
                success:true,
                message: respuesta.message,
                productos: respuesta.productos
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: respuesta.message
            })
        }
    }else{
        const respuesta = await consultarProducto(req.query.nombre)
        if(respuesta.success){
            res.status(200).json({
                success: true,
                message: respuesta.message,
                producto: respuesta.producto
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: respuesta.message
            })
        }
    }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Error al consultar el producto"
        })
    }
}
export async function actualizarElProducto(req, res) {
    try {
        const respuesta = await actualizarProducto(req.body.nombre, req.body.nuevoNombre, req.body.nuevaCategoria, req.body.nombreCar, req.body.nuevoNombreCar, req.body.nuevoValorCar, req.body.nuevoPrecio, req.body.nuevoStock)
        if(respuesta.success){
            res.status(200).json({
                success: true,
                message: respuesta.message,
                productos: respuesta.productos
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: respuesta.message
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto"
        })
    }
}
export async function eliminarElProducto(req, res) {
    try {
        const respuesta = await eliminarProducto(req.body.nombre)
        if(respuesta.success){
            res.status(200).json({
                success: true,
                message: respuesta.message,
                productos: respuesta.productos
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: respuesta.message
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Error al eliminar producto"
        })
    }
}