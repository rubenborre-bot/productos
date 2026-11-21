import client from "../../config/data_base.js"
const baseDatos = "productosDB"
const coleccion = client.db(baseDatos).collection("categorias")
export async function registrarCategoria(nombre) {
    if(typeof nombre == "string" && nombre.trim()!=""){
        const buscarCategoria = await coleccion.findOne({nombre: nombre})
        if(buscarCategoria == null){
            let categoriaObj = {
                nombre: nombre.trim().toLowerCase(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const insertarCategoria = await coleccion.insertOne(categoriaObj)
            if(insertarCategoria.acknowledged){
            return{
                success:true,
                message: `Categoria insertada con id: ${insertarCategoria.insertedId}`
            }
            }else{
                return{
                success: false,
                message: `Error al registrar la categoria`
            }
            }
           
        }else{
            return{
                success:false,
                message: "Ya existe una categoria con ese nombre"
            }
        }
    }else{
        return{
                success:false,
                message: "Ingrese un nombre valido"
            } 
    }
}
export async function consultarCategoria(nombre) {
    if(nombre == undefined){
    const respuesta = await coleccion.find({})
    let respuestaArr = await respuesta.toArray()
    if(respuestaArr.length > 0){
        return{
            success: true,
            message: "Categorias consultadas correctamente",
            categorias: respuestaArr
        }
    }
    else{
       return{
            success: false,
            message: "No se encontraron categorias",
            categorias: respuestaArr
        } 
    }
    }else{
        if(typeof nombre == "string" && nombre.trim()!=""){
            nombre = nombre.trim().toLowerCase()
       const categoria = await coleccion.findOne({nombre: nombre})
       if(categoria != null){
        return{
            success: true,
            message: "Categoria consultada correctamente",
            categoria: categoria
        }
       }else{
        return{
            success: false,
            message: "No se encontro la categoria",
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
export async function actualizarCategoria(nombre, nuevoNombre) {
    if(typeof nombre == "string" && nombre.trim()!="" && typeof nuevoNombre == "string" && nuevoNombre.trim()!=""){
        nombre = nombre.trim().toLowerCase()
        const buscarCategoria = await coleccion.findOne({nombre: nombre})
        if(buscarCategoria != null){
            nuevoNombre = nuevoNombre.trim().toLowerCase()
            const coincidenciaCategoria = await coleccion.findOne({nombre: nuevoNombre})
            if(coincidenciaCategoria == null){
            const actualizarCategoria = await coleccion.updateOne({_id: buscarCategoria._id}, {$set:{nombre: nuevoNombre, updatedAt: new Date() }})
            if(actualizarCategoria.matchedCount>0){
            if(actualizarCategoria.modifiedCount>0){
                const categoria = await consultarCategoria(nuevoNombre)
                return{
                    success:true,
                    message:"Categoria actualizada correctamente",
                    categoria: categoria.categoria
                }
            }else{
                return{
                    success:false,
                    message:"Categoria no actualizada correctamente",
                } 
            }
        }else{
                return{
                    success:false,
                    message:"No se encontro una categoria para actulizar con el nombre proporcionado",
                } 
        }

        }
        else{
           return{
                    success:false,
                    message:"Ya hay una categoria registrada con ese nombre",
                }  
        }
    }else{
            return{
                    success:false,
                    message:"No se encontro ninguna categoria para actualizar con ese nombre",
                } 
        }
    
}else{
      return{
                    success:false,
                    message:"Debe ingresar un nombre valido",
                }   
    }
}
export async function eliminarCategoria(nombre) {
    if(typeof nombre == "string" && nombre.trim()!=""){
    nombre = nombre.trim().toLowerCase()
    const buscarCategoria = await coleccion.findOne({nombre: nombre})
    if(buscarCategoria != null){
        const eliminarCategoria = await coleccion.deleteOne({_id: buscarCategoria._id})
        if(eliminarCategoria.acknowledged){
            if(eliminarCategoria.deletedCount>0){
                const categorias = await consultarCategoria()
                return{
                    success: true,
                    categorias: categorias.categorias
                }
            }else{
                return{
                    success: false,
                    message: "Categoria no eliminada"
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
                    message: "No se encontro una categoria con ese nombre"
                }
    }
    }else{
        return{
                    success: false,
                    message: "Ingrese un nombre valido"
                }
    }
    
}