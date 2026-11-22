import client from "../../config/data_base.js";
import { consultarCategoria } from "../categorias/categoria.service.js";
const baseDatos = "productosDB"
const coleccion = client.db(baseDatos).collection("productos")
export async function registrarProducto(nombre, nombreCategoria, nombreCar, valorCar, precio, stock) {
    if(typeof nombre == "string" && nombre.trim()!="" && typeof nombreCategoria == "string"
&& typeof nombreCar == "string" && nombreCar.trim() != "" && Number.isFinite(precio) && Number.isFinite(stock)
&& typeof valorCar == "string" && valorCar.trim() != ""
){
        if(nombreCategoria.trim()!=""){
            nombreCategoria = nombreCategoria.trim().toLowerCase()
            const categoria = await consultarCategoria(nombreCategoria);
            if(categoria.success){
                nombre = nombre.trim().toLowerCase()
        const buscarProducto = await coleccion.findOne({nombre: nombre})
        if(buscarProducto == null){
            let productoObj = {
                nombre: nombre.trim().toLowerCase(),
                categoriaId: categoria.categoria._id,
                caracteristicas: [{nombre: nombreCar.trim().toLowerCase(),
                    valor: valorCar
                 }],
                precio: precio,
                stock: stock,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const insertarProducto = await coleccion.insertOne(productoObj)
            if(insertarProducto.acknowledged){
            return{
                success:true,
                message: `Producto insertado con id: ${insertarProducto.insertedId}`
            }
            }else{
                return{
                success: false,
                message: `Error al registrar el producto`
            }
            }
           
        }else{
            return{
                success:false,
                message: "Ya existe una producto con ese nombre"
            }
        }
    }else{
        const categorias = await consultarCategoria()
        return{
                success:false,
                message: "No hay una categoria registrada con ese nombre, las categorias existentes son:",
                categorias: categorias.categorias

            }  
    }
    }else{
       return{
                success:false,
                message: "Debe ingresar una categoria para registrar un producto"
            }  
    }
   
}else{
        return{
                success:false,
                message: "Ingrese valores validos para los campos, el precio y el stock deben ser un numero"
            } 
    }

}
export async function consultarProducto(nombre) {
    if(nombre == undefined){
    const respuesta = await coleccion.find({}).sort({updatedAt: -1}).limit(10)
    let respuestaArr = await respuesta.toArray()
    if(respuestaArr.length > 0){
        return{
            success: true,
            message: "Productos consultados correctamente",
            productos: respuestaArr
        }
    }
    else{
       return{
            success: false,
            message: "No se encontraron productos",
            productos: respuestaArr
        } 
    }
    }else{
        if(typeof nombre == "string" && nombre.trim()!=""){
            nombre = nombre.trim().toLowerCase()
       const producto = await coleccion.findOne({nombre: nombre})
       if(producto != null){
        return{
            success: true,
            message: "Producto consultado correctamente",
            producto: producto
        }
       }else{
        return{
            success: false,
            message: "No se encontro el producto",
        }
       }
    
        }else{
            return{
                success: false,
                message: "Ingrese un nombre valido"
            }
        }

    }
    
} 
export async function actualizarProducto(nombre, nuevoNombre, nuevaCategoria,nombreCar, nuevoNombreCar, nuevoValorCar, nuevoPrecio, nuevoStock ) {
    if(typeof nombre == "string" && nombre.trim()!="" && typeof nuevoNombre == "string" && nuevoNombre.trim()!=""&& typeof nuevaCategoria == "string"
 && Number.isFinite(nuevoPrecio) && Number.isFinite(nuevoStock) ){
    nuevaCategoria = nuevaCategoria.trim().toLowerCase()
    const buscarCategoria = await consultarCategoria(nuevaCategoria)
    if(buscarCategoria.success){
        nombre = nombre.trim().toLowerCase()
        const buscarProducto = await coleccion.findOne({nombre: nombre})
        if(buscarProducto != null){
            nuevoNombre = nuevoNombre.trim().toLowerCase()
            const coincidenciaProducto = await coleccion.findOne({nombre: nuevoNombre, _id: {$ne: buscarProducto._id}})
            if(coincidenciaProducto == null){
             if(nombreCar == undefined){
            const actualizarProducto = await coleccion.updateOne({_id: buscarProducto._id}, {$set:{nombre: nuevoNombre, categoriaId: buscarCategoria.categoria._id,  precio: nuevoPrecio, stock: nuevoStock, updatedAt: new Date() }})
            if(actualizarProducto.matchedCount>0){
            if(actualizarProducto.modifiedCount>0){
                const productos = await consultarProducto()
                return{
                    success:true,
                    message:"Producto actualizado correctamente",
                    productos: productos.productos
                }
            }else{
                return{
                    success:false,
                    message:"Producto no actualizado correctamente",
                } 
            }
        }else{
                return{
                    success:false,
                    message:"No se encontro un producto para actulizar con el nombre proporcionado",
                } 
        }
    }else{
        if(typeof nombreCar == "string" && nombreCar.trim()!=""){
        nombreCar = nombreCar.trim().toLowerCase()
        let caractObj = {}
        let campo = ""
        if(nuevoNombreCar != undefined && typeof nuevoNombreCar == "string" && nuevoNombreCar.trim()!=""){
            nuevoNombreCar = nuevoNombreCar.trim().toLowerCase()
            campo = "caracteristicas.$.nombre"
           caractObj[campo]= nuevoNombreCar
        }
        if(nuevoValorCar != undefined && typeof nuevoValorCar == "string" && nuevoValorCar.trim()!=""){
            nuevoValorCar = nuevoValorCar.trim().toLowerCase()
           campo = "caracteristicas.$.valor"
           caractObj[campo]= nuevoValorCar        
        }
        if(Object.keys(caractObj).length > 0){
         const actualizarCar = await coleccion.updateOne({_id: buscarProducto._id, "caracteristicas.nombre": nombreCar}, {$set: caractObj})
         if(actualizarCar.matchedCount>0){
            if(actualizarCar.modifiedCount>0){
            return{
                    success:true,
                    message:"Caracteristica actulizada correctamente",
                } 
         }
         else{
            return{
                    success:false,
                    message:"Caracteristica no actulizada correctamente",
                } 
         }
        }else{
           return{
                    success:false,
                    message:"No se encontro una caracteristica para actualizar con ese nombre",
                }  
        }
    }else{
         return{
                    success:false,
                    message:"Debe ingresar un caracteristica a actualizar",
                }  
    }
}else{
    return{
                    success:false,
                    message:"Proporcione un valor valido para la caracteristica a actualizar ",
                }  
    }
        }

        }
        else{
           return{
                    success:false,
                    message:"Ya hay un producto registrado con ese nombre",
                }  
        }
    }else{
            return{
                    success:false,
                    message:"No se encontro ninguna producto para actualizar con ese nombre",
                } 
        }
    }else{
     return{
                    success:false,
                    message:"No hay ninguna categoria registrada con ese nombre, ingrese una categoria valida",
                } 
   } 
}else{
      return{
                    success:false,
                    message:"Ingrese valores validos para los campos, el precio y el stock deben ser un numero",
                }   
    }
}
export async function eliminarProducto(nombre) {
    if(typeof nombre == "string" && nombre.trim()!=""){
    nombre = nombre.trim().toLowerCase()
    const buscarProducto = await coleccion.findOne({nombre: nombre})
    if(buscarProducto != null){
        const eliminarProducto = await coleccion.deleteOne({_id: buscarProducto._id})
        if(eliminarProducto.acknowledged){
            if(eliminarProducto.deletedCount>0){
                const productos = await consultarProducto()
                return{
                    success: true,
                    productos: productos.productos
                }
            }else{
                return{
                    success: false,
                    message: "Producto no eliminado"
                }
            }
        }else{
            return{
                    success: false,
                    message: "La operacion no se realizo correctamente"
                }
        }
    }else{
        return{
                    success: false,
                    message: "No se encontro un producto con ese nombre"
                }
    }
    }else{
        return{
                    success: false,
                    message: "Ingrese un nombre valido"
                }
    }
    
}