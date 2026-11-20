import { registrarCategoria, consultarCategoria } from "./categoria.service.js";
export async function registrarLaCategoria(req, res) {
    try {
        const respuesta = await registrarCategoria(req.body.nombre)
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
            message: "Error al registrar la categoria"
        })
    }
}
export async function consultarLasCategorias(req, res) {
    try {
        if(req.query.nombre == undefined){
        const respuesta = await consultarCategoria()
        if(respuesta.success){
            res.status(200).json({
                success:true,
                categorias: respuesta.categorias
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: respuesta.message
            })
        }
    }else{
        const respuesta = await consultarCategoria(req.query.nombre)
        if(respuesta.success){
            res.status(200).json({
                success: true,
                categoria: respuesta.categoria
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
            message: "Error al consultar categoria"
        })
    }
}